import { Request } from "express";
import { get, merge } from "lodash";
import { ReadingTimeAnalyzer } from "../../../../config/reading-time/reading-time-analyzer";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import { GetPost, IGetPostPayload } from "../../../../use-cases/post/get-post";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload extends IGetPostPayload {
  user_id: string;
}

export default function makeGetPostController({
  getPost,
  readingTimeAnalyzer,
  getPostBookmarkByUserAndPost,
}: {
  getPost: GetPost;
  readingTimeAnalyzer: ReadingTimeAnalyzer;
  getPostBookmarkByUserAndPost: GetPostBookmarkByUserAndPost;
}) {
  return async function getPostController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: post_id, user_id } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getPost({ _id: post_id });

      if (isEmpty(exists)) {
        throw new Error(`Post by id ${post_id} does not exists`);
      }

      if (user_id) {
        const post_bookmarked = await getPostBookmarkByUserAndPost({
          user_id,
          post_id,
        });

        merge(exists, {
          is_bookmarked: !isEmpty(post_bookmarked),
        });
      }

      const analyzing_text =
        `${exists.title} ${exists.description} ${exists.content}`.replace(
          /<[^>]*>?/gm,
          ""
        );
      const reading_time = readingTimeAnalyzer({ text: analyzing_text });

      const final_data = { ...exists, reading_time };

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_data,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

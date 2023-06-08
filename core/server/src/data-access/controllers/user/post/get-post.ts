import { Request } from "express";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { IReadingTimeAnalyzer } from "../../../../config/reading-time/reading-time-analyzer";
import { IGetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetPostController({
  getPost,
  readingTimeAnalyzer,
  getPostBookmarkByUserAndPost,
}: {
  getPost: IGetPost;
  readingTimeAnalyzer: IReadingTimeAnalyzer;
  getPostBookmarkByUserAndPost: IGetPostBookmarkByUserAndPost;
}) {
  return async function getPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: post_id, user_id } = get(httpRequest, "context.validated");
      const exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });

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

      const final_data = merge({}, exists, { reading_time });

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

import { Request } from "express";
import { get, merge } from "lodash";
import { ReadingTimeAnalyzer } from "../../../../config/reading-time/reading-time-analyzer";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import {
  GetPostBySlug,
  IGetPostBySlug,
} from "../../../../use-cases/post/get-post-by-slug";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload extends IGetPostBySlug {
  user_id: string;
}

export default function makeGetPostBySlugController({
  getPostBySlug,
  readingTimeAnalyzer,
  getPostBookmarkByUserAndPost,
}: {
  getPostBySlug: GetPostBySlug;
  readingTimeAnalyzer: ReadingTimeAnalyzer;
  getPostBookmarkByUserAndPost: GetPostBookmarkByUserAndPost;
}) {
  return async function getPostBySlugController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { slug, user_id } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getPostBySlug({ slug });

      if (isEmpty(exists)) {
        throw new Error(`Post by slug ${slug} does not exists`);
      }

      if (user_id) {
        const post_bookmarked = await getPostBookmarkByUserAndPost({
          user_id,
          post_id: exists._id,
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

      const final_data = Object.assign({}, exists, { reading_time });

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

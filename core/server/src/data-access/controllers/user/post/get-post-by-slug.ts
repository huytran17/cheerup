import { Request } from "express";
import { IReadingTimeAnalyzer } from "../../../../config/reading-time/reading-time-analyzer";
import { IGetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import { IGetPostBySlug } from "../../../../use-cases/post/get-post-by-slug";

export default function makeGetPostBySlugController({
  getPostBySlug,
  readingTimeAnalyzer,
  getPostBookmarkByUserAndPost,
}: {
  getPostBySlug: IGetPostBySlug;
  readingTimeAnalyzer: IReadingTimeAnalyzer;
  getPostBookmarkByUserAndPost: IGetPostBookmarkByUserAndPost;
}) {
  return async function getPostBySlugController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { slug, user_id }: { slug: string; user_id: string } = get(
        httpRequest,
        "context.validated"
      );

      const exists = await getPostBySlug({
        slug,
      });

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

import { Request } from "express";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { IReadingTimeAnalyzer } from "../../../../config/reading-time/reading-time-analyzer";
import { IGetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetPostController({
  getPost,
  readingTimeAnalyzer,
  getPostBookmarkByUserAndPost,
  logger,
}: {
  getPost: IGetPost;
  readingTimeAnalyzer: IReadingTimeAnalyzer;
  getPostBookmarkByUserAndPost: IGetPostBookmarkByUserAndPost;
  logger: Logger;
}) {
  return async function getPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: post_id, user_id } = _.get(httpRequest, "context.validated");
      const exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });

      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`Post by id ${post_id} does not exists`);
      }

      const validPayload = post_id && user_id;
      if (validPayload) {
        const post_bookmarked = await getPostBookmarkByUserAndPost({
          user_id,
          post_id,
        });

        Object.assign(exists, {
          is_bookmarked:
            !_.isEmpty(post_bookmarked) && !_.isNil(post_bookmarked),
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
      return {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

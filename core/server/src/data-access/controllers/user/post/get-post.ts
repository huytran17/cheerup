import { Request } from "express";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { IReadingTimeAnalyzer } from "../../../../config/reading-time/reading-time-analyzer";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetPostController({
  getPost,
  readingTimeAnalyzer,
  logger,
}: {
  getPost: IGetPost;
  readingTimeAnalyzer: IReadingTimeAnalyzer;
  logger: Logger;
}) {
  return async function getPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getPost({
        _id,
        is_only_published: true,
        is_include_deleted: false,
      });

      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`Post ${_id} does not exists`);
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
        statusCode: 200,
        body: {
          data: final_data,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}

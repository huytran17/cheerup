import { Request } from "express";
import { IGetPost } from "../../../../use-cases/post/get-post";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetPostController({
  getPost,
  logger,
}: {
  getPost: IGetPost;
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

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
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

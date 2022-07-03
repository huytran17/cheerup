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
      const { post_id } = _.get(httpRequest, "context.validated");
      const exists = await getPost({ _id: post_id });
      if (!exists) {
        throw new Error(`Post ${post_id} does not exists`);
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

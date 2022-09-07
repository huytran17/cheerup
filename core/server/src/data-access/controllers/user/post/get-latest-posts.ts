import { Request } from "express";
import { IGetLatestPosts } from "../../../../use-cases/post/get-latest-posts";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetLatestPostsController({
  getLatestPosts,
  logger,
}: {
  getLatestPosts: IGetLatestPosts;
  logger: Logger;
}) {
  return async function getLatestPostsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { amount } = _.get(httpRequest, "context.validated");
      const exists = await getLatestPosts({ amount: Number(amount) });

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

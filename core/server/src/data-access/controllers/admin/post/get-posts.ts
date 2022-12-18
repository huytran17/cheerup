import { Request } from "express";
import { IGetPosts } from "../../../../use-cases/post/get-posts";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetPostsController({
  getPosts,
  logger,
}: {
  getPosts: IGetPosts;
  logger: Logger;
}) {
  return async function getPostsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const posts = await getPosts();

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: posts,
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

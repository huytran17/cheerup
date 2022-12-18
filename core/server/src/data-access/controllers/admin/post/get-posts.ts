import { Request } from "express";
import { IGetPosts } from "../../../../use-cases/post/get-posts";
import _ from "lodash";
import { Logger } from "winston";

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
        statusCode: 200,
        body: {
          data: posts,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}

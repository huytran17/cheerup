import { Request } from "express";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPosts } from "../../../../use-cases/post/get-posts";

export default function makeGetPostsController({
  getPosts,
}: {
  getPosts: GetPosts;
}) {
  return async function getPostsController(
    httpRequest: Request & { context: {} }
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

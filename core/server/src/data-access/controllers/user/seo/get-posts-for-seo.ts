import { Request } from "express";
import { IGetPostsForSEO } from "../../../../use-cases/post/get-posts-for-seo";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetPostsForSEOController({
  getPostsForSEO,
}: {
  getPostsForSEO: IGetPostsForSEO;
}) {
  return async function getPostsForSEOController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const posts = await getPostsForSEO();

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

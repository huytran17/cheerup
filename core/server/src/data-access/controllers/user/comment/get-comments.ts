import { Request } from "express";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetComments } from "../../../../use-cases/comment/get-comments";

export default function makeGetCommentsController({
  getComments,
}: {
  getComments: GetComments;
}) {
  return async function getCommentsController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const comments = await getComments();

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: comments,
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

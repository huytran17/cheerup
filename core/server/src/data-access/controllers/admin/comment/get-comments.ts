import { Request } from "express";
import { GetComments } from "../../../../use-cases/comment/get-comments";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetCommentsController({
  getComments,
}: {
  getComments: GetComments;
}) {
  return async function getCommentsController(
    httpRequest: Request & { context: { validated: {} } }
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

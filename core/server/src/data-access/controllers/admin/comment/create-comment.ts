import { ICreateComment } from "../../../../use-cases/comment/create-comment";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeCreateCommentController({
  createComment,
}: {
  createComment: ICreateComment;
}) {
  return async function createCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentDetails = get(httpRequest, "context.validated");

      const created_comment = await createComment({ commentDetails });

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_comment,
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

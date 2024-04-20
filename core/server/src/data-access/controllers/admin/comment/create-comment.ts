import {
  CreateComment,
  ICreateCommentPayload,
} from "../../../../use-cases/comment/create-comment";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeCreateCommentController({
  createComment,
}: {
  createComment: CreateComment;
}) {
  return async function createCommentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const comment_details = <ICreateCommentPayload>(
        get(httpRequest, "context.validated", {})
      );

      const created_comment = await createComment(comment_details);

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

import { ICreateComment } from "../../../../use-cases/comment/create-comment";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeCreateCommentController({
  createComment,
  logger,
}: {
  createComment: ICreateComment;
  logger: Logger;
}) {
  return async function createCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentDetails = _.get(httpRequest, "context.validated");

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

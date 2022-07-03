import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { ICreateComment } from "../../../../use-cases/comment/create-comment";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

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
        statusCode: 200,
        body: {
          data: created_comment,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IDeleteComment } from "../../../../use-cases/comment/delete-comment";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteComment({
  getComment,
  deleteComment,
  logger,
}: {
  getComment: IGetComment;
  deleteComment: IDeleteComment;
  logger: Logger;
}) {
  return async function deleteCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentDetails = _.get(httpRequest, "context.validated");
      const { _id } = commentDetails;
      const exists = await getComment({ _id });
      if (!exists) {
        throw new Error(`Comment by ${_id} does not exist`);
      }

      const deleted_comment = await deleteComment({ _id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted_comment,
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

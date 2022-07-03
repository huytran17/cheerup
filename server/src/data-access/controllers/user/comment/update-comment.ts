import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IUpdateComment } from "../../../../use-cases/comment/update-comment";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeUpdateComment({
  getComment,
  updateComment,
  logger,
}: {
  getComment: IGetComment;
  updateComment: IUpdateComment;
  logger: Logger;
}) {
  return async function updateCommentController(
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

      const updated_comment = await updateComment({ commentDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_comment,
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

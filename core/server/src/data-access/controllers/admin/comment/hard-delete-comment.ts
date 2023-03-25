import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IHardDeleteComment } from "../../../../use-cases/comment/hard-delete-comment";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeDeleteComment({
  getComment,
  hardDeleteComment,
  logger,
}: {
  getComment: IGetComment;
  hardDeleteComment: IHardDeleteComment;
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

      const deleted_comment = await hardDeleteComment({ _id });

      logger.verbose(`Deleted comment by ${_id} and its children successfully`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted_comment,
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

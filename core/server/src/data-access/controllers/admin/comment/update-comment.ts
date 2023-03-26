import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IUpdateComment } from "../../../../use-cases/comment/update-comment";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdateCommentController({
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
      if (isEmpty(exists)) {
        throw new Error(`Comment by ${_id} does not exist`);
      }

      const updated_comment = await updateComment({ commentDetails });
      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_comment,
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

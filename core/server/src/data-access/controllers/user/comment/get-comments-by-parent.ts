import { Request } from "express";
import { IGetCommentsByParent } from "../../../../use-cases/comment/get-comments-by-parent";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetCommentsByParentController({
  getCommentsByParent,
  getComment,
  logger,
}: {
  getCommentsByParent: IGetCommentsByParent;
  getComment: IGetComment;
  logger: Logger;
}) {
  return async function getCommentsByParentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");

      const comment_exists = await getComment({ _id });
      if (isEmpty(comment_exists)) {
        throw new Error(`Comment by ${_id} does not exist`);
      }

      const comments = await getCommentsByParent({ parent_id: _id });

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

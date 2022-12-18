import { Request } from "express";
import { IGetComment } from "../../../../use-cases/comment/get-comment";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetCommentController({
  getComment,
  logger,
}: {
  getComment: IGetComment;
  logger: Logger;
}) {
  return async function getCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { comment_id } = _.get(httpRequest, "context.validated");
      const exists = await getComment({
        _id: comment_id,
        is_include_deleted: false,
      });
      const comment_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (comment_not_exists) {
        throw new Error(`Comment ${comment_id} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

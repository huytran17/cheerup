import { Request } from "express";
import { IGetComment } from "../../../../use-cases/comment/get-comment";
import _ from "lodash";
import { Logger } from "winston";

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
      const exists = await getComment({ _id: comment_id });
      if (!exists) {
        throw new Error(`Comment ${comment_id} does not exists`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}

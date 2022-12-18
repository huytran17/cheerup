import { Request } from "express";
import { IGetComments } from "../../../../use-cases/comment/get-comments";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetCommentsController({
  getComments,
  logger,
}: {
  getComments: IGetComments;
  logger: Logger;
}) {
  return async function getCommentsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const comments = await getComments();

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: comments,
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

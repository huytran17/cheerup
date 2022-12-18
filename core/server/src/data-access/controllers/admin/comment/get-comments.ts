import { Request } from "express";
import { IGetComments } from "../../../../use-cases/comment/get-comments";
import _ from "lodash";
import { Logger } from "winston";

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
        statusCode: 200,
        body: {
          data: comments,
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

import { Request } from "express";
import { IGetFeedbacks } from "../../../../use-cases/feedback/get-feedbacks";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetFeedbacksController({
  getFeedbacks,
  logger,
}: {
  getFeedbacks: IGetFeedbacks;
  logger: Logger;
}) {
  return async function getFeedbacksController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const feedbacks = await getFeedbacks();

      return {
        headers,
        statusCode: 200,
        body: {
          data: feedbacks,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}

import { Request } from "express";
import { IGetFeedback } from "../../../../use-cases/feedback/get-feedback";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetFeedbackController({
  getFeedback,
  logger,
}: {
  getFeedback: IGetFeedback;
  logger: Logger;
}) {
  return async function getFeedbackController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { feedback_id } = _.get(httpRequest, "context.validated");
      const exists = await getFeedback({ _id: feedback_id });
      if (!exists) {
        throw new Error(`Feedback ${feedback_id} does not exists`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
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

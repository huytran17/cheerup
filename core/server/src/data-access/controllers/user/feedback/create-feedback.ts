import { ICreateFeedback } from "../../../../use-cases/feedback/create-feedback";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeCreateFeedbackController({
  createFeedback,
  logger,
}: {
  createFeedback: ICreateFeedback;
  logger: Logger;
}) {
  return async function createFeedbackController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const feedbackDetails = _.get(httpRequest, "context.validated");

      const created_feedback = await createFeedback({ feedbackDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: created_feedback,
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

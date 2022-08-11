import { IGetFeedback } from "../../../../use-cases/feedback/get-feedback";
import { IUpdateFeedback } from "../../../../use-cases/feedback/update-feedback";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeUpdateFeedbackController({
  getFeedback,
  updateFeedback,
  logger,
}: {
  getFeedback: IGetFeedback;
  updateFeedback: IUpdateFeedback;
  logger: Logger;
}) {
  return async function updateFeedbackController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const feedbackDetails = _.get(httpRequest, "context.validated");
      const { _id } = feedbackDetails;
      const exists = await getFeedback({ _id });
      if (!exists) {
        throw new Error(`Feedback by ${_id} does not exist`);
      }

      const updated_feedback = await updateFeedback({ feedbackDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_feedback,
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

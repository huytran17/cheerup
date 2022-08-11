import { IGetFeedback } from "../../../../use-cases/feedback/get-feedback";
import { IDeleteFeedback } from "../../../../use-cases/feedback/delete-feedback";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteFeedbackController({
  getFeedback,
  deleteFeedback,
  logger,
}: {
  getFeedback: IGetFeedback;
  deleteFeedback: IDeleteFeedback;
  logger: Logger;
}) {
  return async function deleteFeedbackController(
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

      const deleted_feedback = await deleteFeedback({ _id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted_feedback,
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

import { Request } from "express";
import { IGetFeedbackAnalystics } from "../../../../use-cases/feedback/get-feedback-analystics";
import _ from "lodash";

export default function makeGetFeedbackAnalysticsController({
  getFeedbackAnalystics,
}: {
  getFeedbackAnalystics: IGetFeedbackAnalystics;
}) {
  return async function getFeedbackAnalysticsController(
    httpRequest: Request & { context: { validated: { feedback_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { distance, unit }: { distance?: number; unit?: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const analystics_data = await getFeedbackAnalystics({ distance, unit });

      return {
        headers,
        statusCode: 200,
        body: {
          data: analystics_data,
        },
      };
    } catch (err) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500,
        body: {
          error: err.message,
        },
      };
    }
  };
}

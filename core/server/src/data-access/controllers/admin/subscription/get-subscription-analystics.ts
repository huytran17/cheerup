import { Request } from "express";
import { IGetSubscriptionAnalystics } from "../../../../use-cases/subscription/get-subscription-analystics";
import _ from "lodash";

export default function makeGetSubscriptionAnalysticsController({
  getSubscriptionAnalystics,
}: {
  getSubscriptionAnalystics: IGetSubscriptionAnalystics;
}) {
  return async function getSubscriptionAnalysticsController(
    httpRequest: Request & {
      context: { validated: { subscription_id: string } };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { distance, unit }: { distance?: number; unit?: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const analystics_data = await getSubscriptionAnalystics({
        distance,
        unit,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: analystics_data,
        },
      };
    } catch (error) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500,
        body: {
          error: error.message,
        },
      };
    }
  };
}

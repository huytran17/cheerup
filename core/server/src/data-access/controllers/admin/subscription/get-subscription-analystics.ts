import { Request } from "express";
import { get, sortBy, split } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetSubscriptionAnalystics,
  IGetSubscriptionAnalystics,
} from "../../../../use-cases/subscription/get-subscription-analystics";

interface IPayload extends Omit<IGetSubscriptionAnalystics, "range"> {
  range?: string;
}

export default function makeGetSubscriptionAnalysticsController({
  getSubscriptionAnalystics,
}: {
  getSubscriptionAnalystics: GetSubscriptionAnalystics;
}) {
  return async function getSubscriptionAnalysticsController(
    httpRequest: Request & {
      context: { validated: {} };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { range, unit } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const splitted_range = sortBy(split(range, ","));

      const analystics_data = await getSubscriptionAnalystics({
        range: splitted_range,
        unit,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: analystics_data,
        },
      };
    } catch (error) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          error: error.message,
        },
      };
    }
  };
}

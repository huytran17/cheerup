import { Request } from "express";
import { GetSubscriptions } from "../../../../use-cases/subscription/get-subscriptions";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetSubscriptionsController({
  getSubscriptions,
}: {
  getSubscriptions: GetSubscriptions;
}) {
  return async function getSubscriptionsController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const subscriptions = await getSubscriptions();

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: subscriptions,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

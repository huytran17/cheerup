import { Request } from "express";
import { IGetSubscriptions } from "../../../../use-cases/subscription/get-subscriptions";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetSubscriptionsController({
  getSubscriptions,
  logger,
}: {
  getSubscriptions: IGetSubscriptions;
  logger: Logger;
}) {
  return async function getSubscriptionsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const subscriptions = await getSubscriptions();

      return {
        headers,
        statusCode: 200,
        body: {
          data: subscriptions,
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

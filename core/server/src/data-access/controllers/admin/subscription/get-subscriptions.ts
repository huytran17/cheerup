import { Request } from "express";
import { IGetSubscriptions } from "../../../../use-cases/subscription/get-subscriptions";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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

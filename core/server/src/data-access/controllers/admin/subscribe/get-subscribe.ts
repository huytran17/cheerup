import { Request } from "express";
import { IGetSubscription } from "../../../../use-cases/subscription/get-subscription";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetSubscriptionController({
  getSubscription,
  logger,
}: {
  getSubscription: IGetSubscription;
  logger: Logger;
}) {
  return async function getSubscriptionController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { subscription_id } = _.get(httpRequest, "context.validated");
      const exists = await getSubscription({ _id: subscription_id });
      if (!exists) {
        throw new Error(`Subscription ${subscription_id} does not exists`);
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

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

      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`Subscription ${subscription_id} does not exists`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}

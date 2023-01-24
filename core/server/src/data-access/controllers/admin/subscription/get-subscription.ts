import { Request } from "express";
import { IGetSubscription } from "../../../../use-cases/subscription/get-subscription";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
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

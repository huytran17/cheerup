import { Request } from "express";
import { IGetSubscription } from "../../../../use-cases/subscription/get-subscription";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

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

      if (isEmpty(exists)) {
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

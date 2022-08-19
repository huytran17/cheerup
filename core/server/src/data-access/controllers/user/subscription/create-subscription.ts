import { ICreateSubscription } from "../../../../use-cases/subscription/create-subscription";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { IGetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";

export default function makeCreateSubscriptionController({
  createSubscription,
  getSubscriptionByEmail,
  logger,
}: {
  createSubscription: ICreateSubscription;
  getSubscriptionByEmail: IGetSubscriptionByEmail;
  logger: Logger;
}) {
  return async function createSubscriptionController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const subscriptionDetails = _.get(httpRequest, "context.validated");

      const { email } = subscriptionDetails;
      const exists = await getSubscriptionByEmail({ email });
      if (exists) {
        throw new Error(`Subscription by ${email} already exists`);
      }

      const created_subscription = await createSubscription({ subscriptionDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: created_subscription,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

import { IGetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";
import { IUpdateSubscription } from "../../../../use-cases/subscription/update-subscription";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteSubscriptionController({
  getSubscriptionByEmail,
  updateSubscription,
  logger,
}: {
  getSubscriptionByEmail: IGetSubscriptionByEmail;
  updateSubscription: IUpdateSubscription;
  logger: Logger;
}) {
  return async function updateSubscriptionController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = _.get(httpRequest, "context.user");

      const exists = await getSubscriptionByEmail({ email });

      const not_exists = !exists || _.isNil(exists);
      if (not_exists) {
        throw new Error(`Subscription by ${email} does not exist`);
      }

      const final_updated_data = Object.assign({}, exists, {
        is_active: false,
      });

      const canceled_subscription = await updateSubscription({
        subscriptionDetails: final_updated_data,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: canceled_subscription,
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

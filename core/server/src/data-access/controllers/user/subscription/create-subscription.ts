import { ICreateSubscription } from "../../../../use-cases/subscription/create-subscription";
import { IUpdateSubscription } from "../../../../use-cases/subscription/update-subscription";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { IGetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";

export default function makeCreateSubscriptionController({
  createSubscription,
  getSubscriptionByEmail,
  updateSubscription,
  logger,
}: {
  createSubscription: ICreateSubscription;
  getSubscriptionByEmail: IGetSubscriptionByEmail;
  updateSubscription: IUpdateSubscription;
  logger: Logger;
}) {
  return async function createSubscriptionController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = _.get(httpRequest, "context.user");
      const { is_active } = _.get(httpRequest, "context.validated");

      const exists = await getSubscriptionByEmail({ email });

      let subscription_data = Object.assign({});
      const already_exists = !_.isEmpty(exists) && !_.isNil(exists);
      if (already_exists) {
        const update_subscription_details = Object.assign({}, exists, {
          is_active,
        });

        subscription_data = await updateSubscription({
          subscriptionDetails: update_subscription_details,
        });
      } else {
        const create_subscription_details = Object.assign({}, exists, {
          is_active,
          email,
        });

        subscription_data = await createSubscription({
          subscriptionDetails: create_subscription_details,
        });
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: subscription_data,
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

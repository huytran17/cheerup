import { ICreateSubscription } from "../../../../use-cases/subscription/create-subscription";
import { IUpdateSubscription } from "../../../../use-cases/subscription/update-subscription";
import { Request } from "express";
import { get, merge } from "lodash";
import { IGetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateSubscriptionController({
  createSubscription,
  getSubscriptionByEmail,
  updateSubscription,
}: {
  createSubscription: ICreateSubscription;
  getSubscriptionByEmail: IGetSubscriptionByEmail;
  updateSubscription: IUpdateSubscription;
}) {
  return async function createSubscriptionController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = get(httpRequest, "context.user");
      const { is_active } = get(httpRequest, "context.validated");

      const exists = await getSubscriptionByEmail({ email });

      let subscription_data = merge({});

      if (!isEmpty(exists)) {
        const update_subscription_details = merge({}, exists, {
          is_active,
        });

        subscription_data = await updateSubscription({
          subscriptionDetails: update_subscription_details,
        });
      } else {
        const create_subscription_details = merge({}, exists, {
          is_active,
          email,
        });

        subscription_data = await createSubscription({
          subscriptionDetails: create_subscription_details,
        });
      }

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: subscription_data,
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

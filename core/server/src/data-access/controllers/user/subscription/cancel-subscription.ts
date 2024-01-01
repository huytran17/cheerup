import { GetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";
import { UpdateSubscription } from "../../../../use-cases/subscription/update-subscription";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCancelSubscriptionController({
  getSubscriptionByEmail,
  updateSubscription,
}: {
  getSubscriptionByEmail: GetSubscriptionByEmail;
  updateSubscription: UpdateSubscription;
}) {
  return async function cancelSubscriptionController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email }: { email: string } = get(httpRequest, "context.user");

      const exists = await getSubscriptionByEmail({ email });

      if (isEmpty(exists)) {
        throw new Error(`Subscription by ${email} does not exist`);
      }

      const final_updated_data = merge({}, exists, {
        is_active: false,
      });

      const canceled_subscription = await updateSubscription({
        subscriptionDetails: final_updated_data,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: canceled_subscription,
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

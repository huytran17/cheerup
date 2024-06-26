import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import { GetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";
import { UpdateSubscription } from "../../../../use-cases/subscription/update-subscription";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCancelSubscriptionController({
  getSubscriptionByEmail,
  updateSubscription,
}: {
  getSubscriptionByEmail: GetSubscriptionByEmail;
  updateSubscription: UpdateSubscription;
}) {
  return async function cancelSubscriptionController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = <IUser>get(httpRequest, "context.user", {});

      const exists = await getSubscriptionByEmail({ email });

      if (isEmpty(exists)) {
        throw new Error(`Subscription by ${email} does not exist`);
      }

      const final_updated_data = {
        ...exists,
        is_active: false,
      };

      const canceled_subscription = await updateSubscription(
        final_updated_data
      );

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

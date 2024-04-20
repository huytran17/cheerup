import {
  CreateSubscription,
  ICreateSubscriptionPayload,
} from "../../../../use-cases/subscription/create-subscription";
import { UpdateSubscription } from "../../../../use-cases/subscription/update-subscription";
import { Request } from "express";
import { get } from "lodash";
import { GetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import IUser from "../../../../database/interfaces/user";

export default function makeCreateSubscriptionController({
  createSubscription,
  getSubscriptionByEmail,
  updateSubscription,
}: {
  createSubscription: CreateSubscription;
  getSubscriptionByEmail: GetSubscriptionByEmail;
  updateSubscription: UpdateSubscription;
}) {
  return async function createSubscriptionController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = <IUser>get(httpRequest, "context.user", {});
      const { is_active } = <ICreateSubscriptionPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getSubscriptionByEmail({ email });

      let subscription_data = {};

      if (!isEmpty(exists)) {
        const update_subscription_details = {
          ...exists,
          is_active,
        };

        subscription_data = await updateSubscription(
          update_subscription_details
        );
      } else {
        const create_subscription_details = {
          ...exists,
          is_active,
          email,
        };

        subscription_data = await createSubscription(
          create_subscription_details
        );
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

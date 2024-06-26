import { Request } from "express";
import { get, merge, omit } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import { GetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";
import { UpdateUser } from "../../../../use-cases/user/update-user";

export default function makeGetMeController({
  getSubscriptionByEmail,
  updateUser,
}: {
  getSubscriptionByEmail: GetSubscriptionByEmail;
  updateUser: UpdateUser;
}) {
  return async function getMeController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const client_ip: string = get(httpRequest, "context.ip", "");

      const exists = <IUser>get(httpRequest, "context.user", {});

      await updateUser({
        ...exists,
        ip: client_ip,
      });

      const subscription = await getSubscriptionByEmail({
        email: exists.email,
      });
      const is_subscribed = get(subscription, "is_active", false);

      const final_user_data = merge(
        {},
        omit(exists, ["tfa_secret", "hash_password"]),
        { is_subscribed }
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_user_data,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          error: error.message,
        },
      };
    }
  };
}

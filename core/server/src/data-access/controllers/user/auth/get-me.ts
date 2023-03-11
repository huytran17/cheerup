import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IGetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetMeController({
  getUser,
  getSubscriptionByEmail,
  updateUser,
}: {
  getUser: IGetUser;
  getSubscriptionByEmail: IGetSubscriptionByEmail;
  updateUser: IUpdateUser;
}) {
  return async function getMeController(
    httpRequest: Request & { context: { validated: { user_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const client_ip = _.get(httpRequest, "context.ip");
      const { _id, email } = _.get(httpRequest, "context.user");

      const exists = await getUser({ _id, is_include_deleted: false });

      if (isEmpty(exists)) {
        throw new Error(`File does not exist`);
      }

      await updateUser({
        userDetails: Object.assign({}, exists, {
          ip: client_ip,
        }),
      });

      const subscription = await getSubscriptionByEmail({ email });
      const is_subscribed = _.get(subscription, "is_active", false);

      const final_user_data = Object.assign({}, exists, {
        is_subscribed,
      });

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

import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IGetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";
import _ from "lodash";

export default function makeGetMeController({
  getUser,
  getSubscriptionByEmail,
}: {
  getUser: IGetUser;
  getSubscriptionByEmail: IGetSubscriptionByEmail;
}) {
  return async function getMeController(
    httpRequest: Request & { context: { validated: { user_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id, email } = _.get(httpRequest, "context.user");

      const exists = await getUser({ _id, is_include_deleted: false });

      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`User ${_id} does not exist`);
      }

      const subscription = await getSubscriptionByEmail({ email });
      const is_subscribed = _.get(subscription, "is_active", false);

      const final_user_data = Object.assign({}, exists, {
        is_subscribed,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: final_user_data,
        },
      };
    } catch (err) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500,
        body: {
          error: err.message,
        },
      };
    }
  };
}

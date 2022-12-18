import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IGetSubscriptionByEmail } from "../../../../use-cases/subscription/get-subscription-by-email";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import { geoip } from "../../../../config/geoip";
import _ from "lodash";

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

      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`User ${_id} does not exist`);
      }

      const client_geo_ip = geoip.lookup(client_ip);

      const has_client_geo_ip =
        !_.isEmpty(client_geo_ip) && !_.isNil(client_geo_ip);

      if (has_client_geo_ip) {
        await updateUser({
          userDetails: Object.assign({}, exists, {
            geoip: { ...client_geo_ip, client_ip },
          }),
        });
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
    } catch (error) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500,
        body: {
          error: error.message,
        },
      };
    }
  };
}

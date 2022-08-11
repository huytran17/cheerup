import { IGetSubscribeByEmail } from "../../../../use-cases/subscribe/get-subscribe-by-email";
import { IUpdateSubscribe } from "../../../../use-cases/subscribe/update-subscribe";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteSubscribeController({
  getSubscribeByEmail,
  updateSubscribe,
  logger,
}: {
  getSubscribeByEmail: IGetSubscribeByEmail;
  updateSubscribe: IUpdateSubscribe;
  logger: Logger;
}) {
  return async function updateSubscribeController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const subscribeDetails = _.get(httpRequest, "context.validated");
      const { email } = subscribeDetails;
      const exists = await getSubscribeByEmail({ email });
      if (!exists) {
        throw new Error(`Subscribe by ${email} does not exist`);
      }

      const final_updated_data = Object.assign({}, exists, {
        is_active: false,
      });

      const canceled_subscribe = await updateSubscribe({
        subscribeDetails: final_updated_data,
      });
      return {
        headers,
        statusCode: 200,
        body: {
          data: canceled_subscribe,
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

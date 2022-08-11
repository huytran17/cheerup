import { ICreateSubscribe } from "../../../../use-cases/subscribe/create-subscribe";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { IGetSubscribeByEmail } from "../../../../use-cases/subscribe/get-subscribe-by-email";

export default function makeCreateSubscribeController({
  createSubscribe,
  getSubscribeByEmail,
  logger,
}: {
  createSubscribe: ICreateSubscribe;
  getSubscribeByEmail: IGetSubscribeByEmail;
  logger: Logger;
}) {
  return async function createSubscribeController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const subscribeDetails = _.get(httpRequest, "context.validated");

      const { email } = subscribeDetails;
      const exists = await getSubscribeByEmail({ email });
      if (exists) {
        throw new Error(`Subscribe by ${email} already exists`);
      }

      const created_subscribe = await createSubscribe({ subscribeDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: created_subscribe,
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

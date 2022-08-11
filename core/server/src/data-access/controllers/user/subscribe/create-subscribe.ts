import { ICreateSubscribe } from "../../../../use-cases/subscribe/create-subscribe";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeCreateSubscribeController({
  createSubscribe,
  logger,
}: {
  createSubscribe: ICreateSubscribe;
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

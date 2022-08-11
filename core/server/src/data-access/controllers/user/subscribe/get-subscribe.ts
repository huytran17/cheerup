import { Request } from "express";
import { IGetSubscribe } from "../../../../use-cases/subscribe/get-subscribe";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetSubscribeController({
  getSubscribe,
  logger,
}: {
  getSubscribe: IGetSubscribe;
  logger: Logger;
}) {
  return async function getSubscribeController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { subscribe_id } = _.get(httpRequest, "context.validated");
      const exists = await getSubscribe({ _id: subscribe_id });
      if (!exists) {
        throw new Error(`Subscribe ${subscribe_id} does not exists`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}

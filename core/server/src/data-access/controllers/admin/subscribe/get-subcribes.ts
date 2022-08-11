import { Request } from "express";
import { IGetSubscribes } from "../../../../use-cases/subscribe/get-subscribes";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetSubscribesController({
  getSubscribes,
  logger,
}: {
  getSubscribes: IGetSubscribes;
  logger: Logger;
}) {
  return async function getSubscribesController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const subscribes = await getSubscribes();

      return {
        headers,
        statusCode: 200,
        body: {
          data: subscribes,
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

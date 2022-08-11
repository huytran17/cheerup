import { IGetSubscribe } from "../../../../use-cases/subscribe/get-subscribe";
import { IUpdateSubscribe } from "../../../../use-cases/subscribe/update-subscribe";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeUpdateSubscribeController({
  getSubscribe,
  updateSubscribe,
  logger,
}: {
  getSubscribe: IGetSubscribe;
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
      const { _id } = subscribeDetails;
      const exists = await getSubscribe({ _id });
      if (!exists) {
        throw new Error(`Subscribe by ${_id} does not exist`);
      }

      const updated_subscribe = await updateSubscribe({ subscribeDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_subscribe,
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

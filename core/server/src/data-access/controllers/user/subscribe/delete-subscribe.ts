import { IGetSubscribe } from "../../../../use-cases/subscribe/get-subscribe";
import { IDeleteSubscribe } from "../../../../use-cases/subscribe/delete-subscribe";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteSubscribeController({
  getSubscribe,
  deleteSubscribe,
  logger,
}: {
  getSubscribe: IGetSubscribe;
  deleteSubscribe: IDeleteSubscribe;
  logger: Logger;
}) {
  return async function deleteSubscribeController(
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

      const deleted_subscribe = await deleteSubscribe({ _id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted_subscribe,
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

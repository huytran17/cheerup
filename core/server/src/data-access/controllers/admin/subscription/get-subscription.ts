import { Request } from "express";
import {
  GetSubscription,
  IGetSubscriptionPayload,
} from "../../../../use-cases/subscription/get-subscription";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetSubscriptionController({
  getSubscription,
}: {
  getSubscription: GetSubscription;
}) {
  return async function getSubscriptionController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetSubscriptionPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getSubscription({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Subscription ${_id} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

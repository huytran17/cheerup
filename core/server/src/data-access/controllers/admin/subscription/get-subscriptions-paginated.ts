import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetSubscriptionsPaginated,
  IGetSubscriptionsPaginated,
} from "../../../../use-cases/subscription/get-subscriptions-paginated";

export default function makeGetSubscriptionsPaginatedController({
  getSubscriptionsPaginated,
}: {
  getSubscriptionsPaginated: GetSubscriptionsPaginated;
}) {
  return async function getSubscriptionsPaginatedController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { query, page, entries_per_page } = <IGetSubscriptionsPaginated>(
        get(httpRequest, "context.validated", {})
      );

      const paginated_data = await getSubscriptionsPaginated({
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: paginated_data,
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

import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetUsersPaginated,
  IGetUsersPaginated,
} from "../../../../use-cases/user/get-users-paginated";

export default function makeGetUsersPaginatedController({
  getUsersPaginated,
}: {
  getUsersPaginated: GetUsersPaginated;
}) {
  return async function getUsersPaginatedController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { query, page, entries_per_page } = <IGetUsersPaginated>(
        get(httpRequest, "context.validated", {})
      );

      const paginated_data = await getUsersPaginated({
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

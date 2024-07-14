import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetAdminsPaginated,
  IGetAdminsPaginated,
} from "../../../../use-cases/admin/get-admins-paginated";

export default function makeGetAdminsPaginatedController({
  getAdminsPaginated,
}: {
  getAdminsPaginated: GetAdminsPaginated;
}) {
  return async function getAdminsPaginatedController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { query, page, entries_per_page } = <IGetAdminsPaginated>(
        get(httpRequest, "context.validated", {})
      );

      const paginated_data = await getAdminsPaginated({
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

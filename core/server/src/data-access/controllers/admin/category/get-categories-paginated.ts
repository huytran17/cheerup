import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetCategoriesPaginated,
  IGetCategoriesPaginated,
} from "../../../../use-cases/category/get-categories-paginated";

export default function makeGetCategoriesPaginatedController({
  getCategoriesPaginated,
}: {
  getCategoriesPaginated: GetCategoriesPaginated;
}) {
  return async function getCategoriesPaginatedController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { query, page, entries_per_page } = <IGetCategoriesPaginated>(
        get(httpRequest, "context.validated", {})
      );

      const categories = await getCategoriesPaginated({
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: categories,
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

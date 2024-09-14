import { Request } from "express";
import {
  GetPostsPaginated,
  IGetPostsPaginated,
} from "../../../../use-cases/post/get-posts-paginated";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { get } from "lodash";

export default function makeGetPostsPaginatedController({
  getPostsPaginated,
}: {
  getPostsPaginated: GetPostsPaginated;
}) {
  return async function getPostsPaginatedController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { categories, tags, sorts, query, page, entries_per_page } = <
        IGetPostsPaginated
      >get(httpRequest, "context.validated", {});

      const paginated_data = await getPostsPaginated({
        categories,
        tags,
        sorts,
        query,
        page,
        entries_per_page,
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

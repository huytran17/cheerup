import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetCommentsPaginated,
  IGetCommentsPaginated,
} from "../../../../use-cases/comment/get-comments-paginated";

export default function makeGetCommentsPaginatedController({
  getCommentsPaginated,
}: {
  getCommentsPaginated: GetCommentsPaginated;
}) {
  return async function getCommentsPaginatedController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { query, page, entries_per_page } = <IGetCommentsPaginated>(
        get(httpRequest, "context.validated", {})
      );

      const paginated_data = await getCommentsPaginated({
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

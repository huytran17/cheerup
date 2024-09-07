import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetGalleriesPaginated,
  IGetGalleriesPaginated,
} from "../../../../use-cases/gallery/get-galleries-paginated";

export default function makeGetGalleriesPaginatedController({
  getGalleriesPaginated,
}: {
  getGalleriesPaginated: GetGalleriesPaginated;
}) {
  return async function getGalleriesPaginatedController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { query, page, entries_per_page, is_parent } = <
        IGetGalleriesPaginated
      >get(httpRequest, "context.validated", {});

      const galleries = await getGalleriesPaginated({
        query,
        page,
        entries_per_page,
        is_parent,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: galleries,
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

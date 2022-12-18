import { Request } from "express";
import { IGetGalleriesPaginated } from "../../../../use-cases/gallery/get-galleries-paginated";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetGalleriesPaginatedController({
  getGalleriesPaginated,
  logger,
}: {
  getGalleriesPaginated: IGetGalleriesPaginated;
  logger: Logger;
}) {
  return async function getGalleriesPaginatedController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const {
        query,
        page,
        entries_per_page,
        is_parent,
      }: {
        query: string;
        page: number;
        entries_per_page: number;
        is_parent?: boolean;
      } = _.get(httpRequest, "context.validated");

      const galleries = await getGalleriesPaginated(
        {
          query,
          page,
          entries_per_page,
        },
        {
          is_parent,
        }
      );

      return {
        headers,
        statusCode: 200,
        body: galleries,
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}

import { Request } from "express";
import { IGetGalleriesPaginated } from "../../../../use-cases/gallery/get-galleries-paginated";
import { IGetPost } from "../../../../use-cases/post/get-post";
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
        name,
        item_name,
        query,
        page,
        entries_per_page,
      }: {
        name: string;
        item_name: string;
        query: string;
        page: number;
        entries_per_page: number;
      } = _.get(httpRequest, "context.validated");

      const galleries = await getGalleriesPaginated(
        { name, item_name },
        {
          query,
          page,
          entries_per_page,
        }
      );

      return {
        headers,
        statusCode: 200,
        body: {
          data: galleries,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}

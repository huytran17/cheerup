import { Request } from "express";
import { filter, get, split } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetPostsPaginated,
  IGetPostsPaginated,
} from "../../../../use-cases/post/get-posts-paginated";

interface IPayload extends Omit<IGetPostsPaginated, "tags" | "categories"> {
  tags?: string;
  categories?: string;
}

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
      const {
        query,
        page,
        entries_per_page,
        sorts,
        tags = "",
        categories = "",
      } = <IPayload>get(httpRequest, "context.validated", {});

      const categories_array = filter(split(categories, ","));
      const tags_array = filter(split(tags, ","));

      const paginated_data = await getPostsPaginated({
        categories: categories_array,
        tags: tags_array,
        sorts,
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

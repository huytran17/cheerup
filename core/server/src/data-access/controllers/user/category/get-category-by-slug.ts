import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetCategoryBySlug,
  IGetCategoryBySlugPayload,
} from "../../../../use-cases/category/get-category-by-slug";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetCategoryBySlugController({
  getCategoryBySlug,
}: {
  getCategoryBySlug: GetCategoryBySlug;
}) {
  return async function getCategoryBySlugController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { slug } = <IGetCategoryBySlugPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getCategoryBySlug({
        slug,
      });

      if (isEmpty(exists)) {
        throw new Error(`Category by slug ${slug} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
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

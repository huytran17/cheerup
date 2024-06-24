import { Request } from "express";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetCategoriesForSEO } from "../../../../use-cases/category/get-categories-for-seo";

export default function makeGetCategoriesForSEOController({
  getCategoriesForSEO,
}: {
  getCategoriesForSEO: GetCategoriesForSEO;
}) {
  return async function getCategoriesForSEOController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const categories = await getCategoriesForSEO();

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

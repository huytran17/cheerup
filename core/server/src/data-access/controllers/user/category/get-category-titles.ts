import { Request } from "express";
import { GetCategoryTitles } from "../../../../use-cases/category/get-category-titles";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetCategoryTitlesController({
  getCategoryTitles,
}: {
  getCategoryTitles: GetCategoryTitles;
}) {
  return async function getCategoryTitlesController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = await getCategoryTitles();

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

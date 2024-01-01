import { Request } from "express";
import { GetCategoryTitles } from "../../../../use-cases/category/get-category-titles";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetCategoryTitlesController({
  getCategoryTitles,
}: {
  getCategoryTitles: GetCategoryTitles;
}) {
  return async function getCategoryTitlesController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = await getCategoryTitles();

      if (isEmpty(exists)) {
        throw new Error(`No category titles found`);
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

import { Request } from "express";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetCategories } from "../../../../use-cases/category/get-categories";

export default function makeGetCategoriesController({
  getCategories,
}: {
  getCategories: GetCategories;
}) {
  return async function getCategoriesController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const categories = await getCategories();

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

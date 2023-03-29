import { Request } from "express";
import { IGetCategories } from "../../../../use-cases/category/get-categories";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetCategoriesController({
  getCategories,
}: {
  getCategories: IGetCategories;
}) {
  return async function getCategoriesController(
    httpRequest: Request & { context: { validated: {} } }
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

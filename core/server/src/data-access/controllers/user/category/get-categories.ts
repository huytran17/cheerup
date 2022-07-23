import { Request } from "express";
import { IGetCategories } from "../../../../use-cases/category/get-categories";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetCategoriesController({
  getCategories,
  logger,
}: {
  getCategories: IGetCategories;
  logger: Logger;
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
        statusCode: 200,
        body: {
          data: categories,
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

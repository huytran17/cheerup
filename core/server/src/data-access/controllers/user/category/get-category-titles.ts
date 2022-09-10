import { Request } from "express";
import { IGetCategoryTitles } from "../../../../use-cases/category/get-category-titles";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetCategoryTitlesController({
  getCategoryTitles,
  logger,
}: {
  getCategoryTitles: IGetCategoryTitles;
  logger: Logger;
}) {
  return async function getCategoryTitlesController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { category_id } = _.get(httpRequest, "context.validated");
      const exists = await getCategoryTitles();
      if (!exists) {
        throw new Error(`Category ${category_id} does not exists`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
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

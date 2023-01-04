import { Request } from "express";
import { IGetCategoryTitles } from "../../../../use-cases/category/get-category-titles";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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
      const exists = await getCategoryTitles();
      if (!exists) {
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
      return {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

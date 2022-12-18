import { Request } from "express";
import { IGetCategory } from "../../../../use-cases/category/get-category";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetCategoryController({
  getCategory,
  logger,
}: {
  getCategory: IGetCategory;
  logger: Logger;
}) {
  return async function getCategoryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { category_id } = _.get(httpRequest, "context.validated");
      const exists = await getCategory({
        _id: category_id,
        is_include_deleted: false,
      });
      if (!exists) {
        throw new Error(`Category ${category_id} does not exists`);
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

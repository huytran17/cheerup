import { Request } from "express";
import { IGetCategory } from "../../../../use-cases/category/get-category";
import _ from "lodash";
import { Logger } from "winston";

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
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getCategory({ _id });
      if (!exists) {
        throw new Error(`Category ${_id} does not exists`);
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

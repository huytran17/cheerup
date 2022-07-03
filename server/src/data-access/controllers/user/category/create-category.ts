import { ICreateCategory } from "../../../../use-cases/category/create-category";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeCreateCategory({
  createCategory,
  logger,
}: {
  createCategory: ICreateCategory;
  logger: Logger;
}) {
  return async function createCategoryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const categoryDetails = _.get(httpRequest, "context.validated");

      const created_category = await createCategory({ categoryDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: created_category,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

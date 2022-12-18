import { ICreateCategory } from "../../../../use-cases/category/create-category";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeCreateCategoryController({
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

      const { _id: user_id } = _.get(httpRequest, "context.user");

      const final_category_data = Object.assign({}, categoryDetails, {
        created_by: user_id,
      });

      const created_category = await createCategory({
        categoryDetails: final_category_data,
      });
      return {
        headers,
        statusCode: 201,
        body: {
          data: created_category,
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

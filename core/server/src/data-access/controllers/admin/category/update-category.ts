import { IGetCategory } from "../../../../use-cases/category/get-category";
import { IUpdateCategory } from "../../../../use-cases/category/update-category";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeUpdateCategoryController({
  getCategory,
  updateCategory,
  logger,
}: {
  getCategory: IGetCategory;
  updateCategory: IUpdateCategory;
  logger: Logger;
}) {
  return async function updateCategoryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const categoryDetails = _.get(httpRequest, "context.validated");
      const { _id } = categoryDetails;
      const exists = await getCategory({ _id });
      if (!exists) {
        throw new Error(`Category by ${_id} does not exist`);
      }

      const updated_category = await updateCategory({ categoryDetails });
      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_category,
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

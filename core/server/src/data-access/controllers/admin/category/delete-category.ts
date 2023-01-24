import { IGetCategory } from "../../../../use-cases/category/get-category";
import { IDeleteCategory } from "../../../../use-cases/category/delete-category";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeDeleteCategoryController({
  getCategory,
  deleteCategory,
  logger,
}: {
  getCategory: IGetCategory;
  deleteCategory: IDeleteCategory;
  logger: Logger;
}) {
  return async function deleteCategoryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getCategory({ _id });
      if (!exists) {
        throw new Error(`Category by ${_id} does not exist`);
      }

      const deleted_category = await deleteCategory({
        _id,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted_category,
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

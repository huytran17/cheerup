import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  DeleteCategory,
  IDeleteCategory,
} from "../../../../use-cases/category/delete-category";
import { GetCategory } from "../../../../use-cases/category/get-category";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeDeleteCategoryController({
  getCategory,
  deleteCategory,
  logger,
}: {
  getCategory: GetCategory;
  deleteCategory: DeleteCategory;
  logger: Logger;
}) {
  return async function deleteCategoryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IDeleteCategory>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getCategory({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Category by ${_id} does not exist`);
      }

      const deleted_category = await deleteCategory({
        _id,
      });

      logger.verbose(`Deleted category ${exists.title}`);

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

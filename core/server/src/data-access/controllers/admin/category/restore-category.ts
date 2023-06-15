import { IGetCategory } from "../../../../use-cases/category/get-category";
import { IUpdateCategory } from "../../../../use-cases/category/update-category";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeRestoreCategoryController({
  getCategory,
  updateCategory,
  logger,
}: {
  getCategory: IGetCategory;
  updateCategory: IUpdateCategory;
  logger: Logger;
}) {
  return async function restoreCategoryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getCategory({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Category by id ${_id} does not exist`);
      }

      const updated_category_data = merge({}, exists, {
        deleted_at: null,
      });

      const updated_category = await updateCategory({
        categoryDetails: updated_category_data,
      });

      logger.verbose(`Restored category ${exists.title} successfully`);

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

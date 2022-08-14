import { IGetCategory } from "../../../../use-cases/category/get-category";
import { IUpdateCategory } from "../../../../use-cases/category/update-category";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

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
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getCategory({ _id });
      if (!exists) {
        throw new Error(`Category by id ${_id} does not exist`);
      }

      const updated_category_data = Object.assign({}, exists, {
        deleted_at: null,
      });

      const updated_category = await updateCategory({
        categoryDetails: updated_category_data,
      });

      logger.verbose(`Restored category ${_id} successfully`);

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_category,
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

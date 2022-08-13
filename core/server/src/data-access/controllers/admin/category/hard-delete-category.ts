import { IGetCategory } from "../../../../use-cases/category/get-category";
import { IHardDeleteCategory } from "../../../../use-cases/category/hard-delete-category";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeHardDeleteCategoryController({
  getCategory,
  hardDeleteCategory,
  logger,
}: {
  getCategory: IGetCategory;
  hardDeleteCategory: IHardDeleteCategory;
  logger: Logger;
}) {
  return async function hardDeleteCategoryController(
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

      const deleted_category = await hardDeleteCategory({ _id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted_category,
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

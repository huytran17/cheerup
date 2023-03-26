import { IGetCategory } from "../../../../use-cases/category/get-category";
import { IHardDeleteCategory } from "../../../../use-cases/category/hard-delete-category";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

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
      if (isEmpty(exists)) {
        throw new Error(`Category by ${_id} does not exist`);
      }

      const deleted_category = await hardDeleteCategory({ _id });
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

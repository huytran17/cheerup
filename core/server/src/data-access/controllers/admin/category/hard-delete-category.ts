import { GetCategory } from "../../../../use-cases/category/get-category";
import { HardDeleteCategory } from "../../../../use-cases/category/hard-delete-category";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeHardDeleteCategoryController({
  getCategory,
  hardDeleteCategory,
  logger,
}: {
  getCategory: GetCategory;
  hardDeleteCategory: HardDeleteCategory;
  logger: Logger;
}) {
  return async function hardDeleteCategoryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const categoryDetails = get(httpRequest, "context.validated");
      const { _id }: { _id: string } = categoryDetails;

      const exists = await getCategory({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Category by ${_id} does not exist`);
      }

      const deleted_category = await hardDeleteCategory({ _id });

      logger.verbose(`Hard deleted category ${exists.title}`);

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

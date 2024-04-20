import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetSoftDeletedCategory,
  IGetSoftDeletedCategoryPayload,
} from "../../../../use-cases/category/get-soft-deleted-category";
import { UpdateCategory } from "../../../../use-cases/category/update-category";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeRestoreCategoryController({
  getSoftDeletedCategory,
  updateCategory,
  logger,
}: {
  getSoftDeletedCategory: GetSoftDeletedCategory;
  updateCategory: UpdateCategory;
  logger: Logger;
}) {
  return async function restoreCategoryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetSoftDeletedCategoryPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getSoftDeletedCategory({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Category by id ${_id} does not exist`);
      }

      const updated_category_data = {
        ...exists,
        deleted_at: null,
      };

      const updated_category = await updateCategory(updated_category_data);

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

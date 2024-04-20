import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetCategory } from "../../../../use-cases/category/get-category";
import { GetCategoryByTitle } from "../../../../use-cases/category/get-category-by-title";
import {
  IUpdateCategoryPayload,
  UpdateCategory,
} from "../../../../use-cases/category/update-category";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdateCategoryController({
  getCategory,
  updateCategory,
  getCategoryByTitle,
  logger,
}: {
  getCategory: GetCategory;
  updateCategory: UpdateCategory;
  getCategoryByTitle: GetCategoryByTitle;
  logger: Logger;
}) {
  return async function updateCategoryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const category_details = <IUpdateCategoryPayload>(
        get(httpRequest, "context.validated", {})
      );
      const { _id, title } = category_details;

      const exists = await getCategory({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Category by ${_id} does not exist`);
      }

      const updated_title = exists.title !== title;
      let exists_by_title = null;

      if (updated_title) {
        exists_by_title = await getCategoryByTitle({
          title,
        });
      }

      if (!isEmpty(exists_by_title)) {
        throw new Error(`Category ${title} already exists`);
      }

      const updated_category = await updateCategory({
        ...category_details,
        seo: {
          ...category_details?.seo,
          date_modified: new Date(),
        },
      });

      logger.verbose(`Updated category ${exists.title}`);

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

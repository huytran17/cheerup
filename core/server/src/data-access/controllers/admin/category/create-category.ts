import {
  CreateCategory,
  ICreateCategoryPayload,
} from "../../../../use-cases/category/create-category";
import { UpdateCategory } from "../../../../use-cases/category/update-category";
import { GetCategoryByTitle } from "../../../../use-cases/category/get-category-by-title";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import IAdmin from "../../../../database/interfaces/admin";

export default function makeCreateCategoryController({
  createCategory,
  updateCategory,
  getCategoryByTitle,
  logger,
}: {
  createCategory: CreateCategory;
  updateCategory: UpdateCategory;
  getCategoryByTitle: GetCategoryByTitle;
  logger: Logger;
}) {
  return async function createCategoryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const categoryDetails = <ICreateCategoryPayload>(
        get(httpRequest, "context.validated", {})
      );

      const { title } = categoryDetails;

      const category = await getCategoryByTitle({
        title,
      });

      if (!isEmpty(category)) {
        throw new Error(`Category ${title} already exists`);
      }

      const { _id: admin_id } = <IAdmin>get(httpRequest, "context.user", {});

      const final_category_data = <ICreateCategoryPayload>(
        merge({}, categoryDetails, {
          created_by: admin_id,
        })
      );

      const created_category = await createCategory({
        categoryDetails: final_category_data,
      });

      const updated_category = await updateCategory({
        categoryDetails: {
          ...created_category,
          seo: {
            date_modified: created_category?.updated_at,
            date_published: created_category?.created_at,
            publisher: created_category?.created_by,
            author: created_category?.created_by,
          },
        },
      });

      logger.verbose(`Created category ${created_category.title}`);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
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

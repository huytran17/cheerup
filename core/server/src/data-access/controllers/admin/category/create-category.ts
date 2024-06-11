import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import {
  CreateCategory,
  ICreateCategoryPayload,
} from "../../../../use-cases/category/create-category";
import { UpdateCategory } from "../../../../use-cases/category/update-category";

export default function makeCreateCategoryController({
  createCategory,
  updateCategory,
  logger,
}: {
  createCategory: CreateCategory;
  updateCategory: UpdateCategory;
  logger: Logger;
}) {
  return async function createCategoryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const category_details = <ICreateCategoryPayload>(
        get(httpRequest, "context.validated", {})
      );

      const admin = <IAdmin>get(httpRequest, "context.user", {});

      const created_category = await createCategory({
        ...category_details,
        created_by: admin,
      });

      const updated_category = await updateCategory({
        ...created_category,
        seo: {
          date_modified: created_category.created_at,
          date_published: created_category.created_at,
          publisher: admin.full_name,
          author: admin.full_name,
          title: created_category.title,
          description: created_category.description,
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

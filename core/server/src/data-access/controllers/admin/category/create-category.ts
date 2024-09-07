import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import {
  CreateCategory,
  ICreateCategory,
} from "../../../../use-cases/category/create-category";

export default function makeCreateCategoryController({
  createCategory,
  logger,
}: {
  createCategory: CreateCategory;
  logger: Logger;
}) {
  return async function createCategoryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const category_details = <ICreateCategory>(
        get(httpRequest, "context.validated", {})
      );

      const admin = <IAdmin>get(httpRequest, "context.user", {});

      const created_category = await createCategory({
        ...category_details,
        created_by: admin,
        seo: {
          date_modified: new Date(),
          date_published: new Date(),
          publisher: admin.full_name,
          author: admin.full_name,
          title: category_details.title,
          description: category_details.description,
        },
      });

      logger.verbose(`Created category ${created_category.title}`);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_category,
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

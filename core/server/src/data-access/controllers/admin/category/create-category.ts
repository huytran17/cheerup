import { ICreateCategory } from "../../../../use-cases/category/create-category";
import { IUpdateCategory } from "../../../../use-cases/category/update-category";
import { IGetCategoryByTitle } from "../../../../use-cases/category/get-category-by-title";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateCategoryController({
  createCategory,
  updateCategory,
  getCategoryByTitle,
  logger,
}: {
  createCategory: ICreateCategory;
  updateCategory: IUpdateCategory;
  getCategoryByTitle: IGetCategoryByTitle;
  logger: Logger;
}) {
  return async function createCategoryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const categoryDetails = get(httpRequest, "context.validated");
      const { title } = categoryDetails;

      const category = await getCategoryByTitle({
        title,
      });

      if (!isEmpty(category)) {
        throw new Error(`Category ${title} already exists`);
      }

      const { _id: user_id } = get(httpRequest, "context.user");

      const final_category_data = Object.assign({}, categoryDetails, {
        created_by: user_id,
      });

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

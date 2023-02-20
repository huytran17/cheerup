import { ICreateCategory } from "../../../../use-cases/category/create-category";
import { IGetCategoryByTitle } from "../../../../use-cases/category/get-category-by-title";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateCategoryController({
  createCategory,
  getCategoryByTitle,
  logger,
}: {
  createCategory: ICreateCategory;
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
      const categoryDetails = _.get(httpRequest, "context.validated");
      const { title } = categoryDetails;

      const category = await getCategoryByTitle({
        title,
      });

      if (!isEmpty(category)) {
        throw new Error(`Category ${title} already exists`);
      }

      const { _id: user_id } = _.get(httpRequest, "context.user");

      const final_category_data = Object.assign({}, categoryDetails, {
        created_by: user_id,
      });

      const created_category = await createCategory({
        categoryDetails: final_category_data,
      });
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

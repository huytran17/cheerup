import { Request } from "express";
import { IGetCategory } from "../../../../use-cases/category/get-category";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetCategoryController({
  getCategory,
}: {
  getCategory: IGetCategory;
}) {
  return async function getCategoryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { category_id } = get(httpRequest, "context.validated");

      const exists = await getCategory({
        _id: category_id,
        is_include_deleted: false,
      });

      if (isEmpty(exists)) {
        throw new Error(`Category ${category_id} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
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

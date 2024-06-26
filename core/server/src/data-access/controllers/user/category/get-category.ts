import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetCategory,
  IGetCategoryPayload,
} from "../../../../use-cases/category/get-category";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetCategoryController({
  getCategory,
}: {
  getCategory: GetCategory;
}) {
  return async function getCategoryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetCategoryPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getCategory({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Category ${_id} does not exists`);
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

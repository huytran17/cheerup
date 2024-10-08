import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetCategory,
  IGetCategory,
} from "../../../../use-cases/category/get-category";
import { UpdateCategory } from "../../../../use-cases/category/update-category";
import deleteS3Object from "../../../../utils/delete-s3-object";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUploadCategoryThumbnailController({
  getCategory,
  updateCategory,
}: {
  getCategory: GetCategory;
  updateCategory: UpdateCategory;
}) {
  return async function uploadCategoryThumbnailController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetCategory>get(httpRequest, "context.validated", {});

      const exists = await getCategory({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Categiry by ${_id} does not exist`);
      }

      const file = <Record<string, unknown>>(
        get(httpRequest, "context.file", {})
      );

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const bucket = <string>get(exists, "thumbnail.bucket", "");
      const key = <string>get(exists, "thumbnail.key", "");

      deleteS3Object({ bucket, key });

      const category_details = {
        ...exists,
        thumbnail: file,
        seo: {
          ...exists.seo,
          thumbnail: file.location,
        },
      };

      const updated_category = await updateCategory(category_details);

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

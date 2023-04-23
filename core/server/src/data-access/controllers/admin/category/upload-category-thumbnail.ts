import { Request } from "express";
import { get } from "lodash";
import { IGetCategory } from "../../../../use-cases/category/get-category";
import { IUpdateCategory } from "../../../../use-cases/category/update-category";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import deleteS3Object from "../../../../utils/delete-s3-object";

export default function makeUploadCategoryThumbnailController({
  getCategory,
  updateCategory,
}: {
  getCategory: IGetCategory;
  updateCategory: IUpdateCategory;
}) {
  return async function uploadCategoryThumbnailController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getCategory({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Categiry by ${_id} does not exist`);
      }

      const file = get(httpRequest, "context.file");

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const bucket = get(exists, "thumbnail.bucket");
      const key = get(exists, "thumbnail.key");

      deleteS3Object({ bucket, key });

      const category_details = Object.assign({}, exists, {
        thumbnail: file,
        seo: {
          ...exists.seo,
          thumbnail: file.location,
        },
      });

      const updated_category = await updateCategory({
        categoryDetails: category_details,
      });

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

import { Request } from "express";
import * as _ from "lodash";
import { IGetCategory } from "../../../../use-cases/category/get-category";
import { IUpdateCategory } from "../../../../use-cases/category/update-category";
import Storage from "../../../../config/storage";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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
      const { _id }: { _id: string } = _.get(httpRequest, "context.validated");

      const exists = await getCategory({ _id });
      const category_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (category_not_exists) {
        throw new Error(`Categiry by ${_id} does not exist`);
      }

      const file = _.get(httpRequest, "context.file");
      const file_not_exists = _.isEmpty(file) || _.isNil(file);
      if (file_not_exists) {
        throw new Error(`File does not exist`);
      }

      const current_bucket = _.get(exists, "thumbnail.bucket", "");
      const current_key = _.get(exists, "thumbnail.key", "");

      const validCredentials = current_bucket && current_key;
      if (!validCredentials) {
        const s3_params = {
          Bucket: current_bucket,
          Key: current_key,
        };

        Storage.deleteS3Object(s3_params);
      }

      const category_details = Object.assign({}, exists, {
        thumbnail: file,
      });

      const updated_category = await updateCategory({
        categoryDetails: category_details,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_category,
        }, // TODO: add in implementation of resource
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

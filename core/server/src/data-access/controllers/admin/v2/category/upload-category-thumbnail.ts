import { Request } from "express";
import { get } from "lodash";
import {
  GetCategory,
  IGetCategoryPayload,
} from "../../../../../use-cases/category/get-category";
import { UpdateCategory } from "../../../../../use-cases/category/update-category";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import { isEmpty } from "../../../../../utils/is-empty";
import { IDiskUploadedFile } from "../../../../../config/middlewares/disk-upload-file";
import deleteUploadedFile from "../../../../../utils/delete-uploaded-file";
import getFIleUploadedPath from "../../../../../utils/get-file-uploaded-path";

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
      const { _id } = <IGetCategoryPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getCategory({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Categiry by ${_id} does not exist`);
      }

      const file = <IDiskUploadedFile>get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      deleteUploadedFile(exists.thumbnail_url);

      const file_path = getFIleUploadedPath(file.path);
      const category_details = {
        ...exists,
        thumbnail: {
          ...file,
          path: file_path,
          destination: getFIleUploadedPath(file.destination),
        },
        seo: {
          ...exists.seo,
          thumbnail: file_path,
        },
      };

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

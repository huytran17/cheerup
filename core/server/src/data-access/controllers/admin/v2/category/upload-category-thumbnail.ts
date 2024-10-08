import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import {
  GetCategory,
  IGetCategory,
} from "../../../../../use-cases/category/get-category";
import { UpdateCategory } from "../../../../../use-cases/category/update-category";
import deleteUploadedFile from "../../../../../utils/delete-uploaded-file";
import getFIleUploadedPath from "../../../../../utils/get-file-uploaded-path";
import { isEmpty } from "../../../../../utils/is-empty";

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

      const file = <IFileMeta>get(httpRequest, "context.file", {});

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

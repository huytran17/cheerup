import { Request } from "express";
import * as _ from "lodash";
import { IGetCategory } from "../../../../use-cases/category/get-category";
import { IUpdateCategory } from "../../../../use-cases/category/update-category";

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
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `Category does not exists.`,
          },
        };
      }

      const file = _.get(httpRequest, "context.file");
      if (!file) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `File does not exists.`,
          },
        };
      }

      const aws_payload = {
        mime_type: file.mimetype,
        dirname: file.key,
        size: file.size,
        name: file.originalname,
        meta: {
          bucket: file.bucket,
          acl: file.bucket,
          ...file,
        },
      };

      const category_details = Object.assign({}, exists, {
        thumbnail: aws_payload,
      });

      const updated_category = await updateCategory({
        categoryDetails: category_details,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_category,
        }, // TODO: add in implementation of resource
      };
    } catch (err) {
      // TODO: add in error handling here
      // TODO: revert the file upload that was done
      // await session.abortTransaction();
      console.error(err);
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 404,
        body: {
          error: err.message,
        },
      };
    }
  };
}

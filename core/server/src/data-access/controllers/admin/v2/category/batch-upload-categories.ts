import { Request } from "express";
import { get } from "lodash";
import { excelToJSON } from "../../../../../config/excel-to-json";
import { ExcelTemplateSheet } from "../../../../../constants/excel-template-sheet";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import IAdmin from "../../../../../database/interfaces/admin";
import {
  BatchUploadCategories,
  IBatchUploadCategories,
} from "../../../../../use-cases/category/batch-upload-categories";

export default function makeBatchUploadCategoriesController({
  batchUploadCategories,
}: {
  batchUploadCategories: BatchUploadCategories;
}) {
  return async function batchUploadCategoriesController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const file = <IFileMeta>get(httpRequest, "context.file", {});
      const admin = <IAdmin>get(httpRequest, "context.user", {});

      const payload = <IBatchUploadCategories[]>excelToJSON({
        source: file.path,
        sheet: ExcelTemplateSheet.CATEGORY,
      });

      const batch_payload = payload.map((category) => ({
        ...category,
        seo: {
          date_modified: new Date(),
          date_published: new Date(),
          publisher: admin.full_name,
          author: admin.full_name,
          title: category.title,
          description: category.description,
        },
      }));

      const categories = await batchUploadCategories(batch_payload);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: categories,
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

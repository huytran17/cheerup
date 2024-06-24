import { Request } from "express";
import { get } from "lodash";
import { ExcelToJSON } from "../../../../../config/excel-to-json/make-excel-to-json";
import { HashPassword } from "../../../../../config/password/hash-password";
import { ExcelTemplateSheet } from "../../../../../constants/excel-template-sheet";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import {
  BatchUploadAdmins,
  IBatchUploadAdmins,
} from "../../../../../use-cases/admin/batch-upload-admins";
import { GetAdminByEmail } from "../../../../../use-cases/admin/get-admin-by-email";
import { isEmpty } from "../../../../../utils/is-empty";

export default function makeBatchUploadAdminsController({
  batchUploadAdmins,
  hashPassword,
  getAdminByEmail,
  excelToJSON,
}: {
  batchUploadAdmins: BatchUploadAdmins;
  hashPassword: HashPassword;
  getAdminByEmail: GetAdminByEmail;
  excelToJSON: ExcelToJSON;
}) {
  return async function batchUploadAdminsController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const file = <IFileMeta>get(httpRequest, "context.file", {});

      const payload = <IBatchUploadAdmins[]>(
        excelToJSON({ source: file.path, sheet: ExcelTemplateSheet.ADMIN })
      );

      const batch_payload_promises = payload.map(async (admin) => {
        const { email, password, password_confirmation } = admin;

        const exists = await getAdminByEmail({ email });
        if (!isEmpty(exists)) {
          return;
        }

        const hashed_password = await hashPassword({
          password,
          password_confirmation,
        });

        return { ...admin, hash_password: hashed_password };
      });

      const final_payload = await Promise.all(batch_payload_promises);

      const admins = await batchUploadAdmins(final_payload.filter(Boolean));

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: admins,
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

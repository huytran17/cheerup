import { Request } from "express";
import { get } from "lodash";
import { excelToJSON } from "../../../../../config/excel-to-json";
import { HashPassword } from "../../../../../config/password/hash-password";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import {
  BatchUploadAdmins,
  IBatchUploadAdmins,
} from "../../../../../use-cases/admin/batch-upload-admins";
import { GetAdminByEmail } from "../../../../../use-cases/admin/get-admin-by-email";
import { isEmpty } from "../../../../../utils/is-empty";
import { ExcelTemplateSheet } from "../../../../../constants/excel-template-sheet";

export default function makeBatchUploadAdminsController({
  batchUploadAdmins,
  hashPassword,
  getAdminByEmail,
}: {
  batchUploadAdmins: BatchUploadAdmins;
  hashPassword: HashPassword;
  getAdminByEmail: GetAdminByEmail;
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

      const final_payload_promises = payload.map(async (admin) => {
        const { email, password, password_confirmation } = admin;
        console.log("-------------------ad", admin);

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

      const final_payload = await Promise.all(
        final_payload_promises.filter(Boolean)
      );

      const admins = await batchUploadAdmins(final_payload);

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

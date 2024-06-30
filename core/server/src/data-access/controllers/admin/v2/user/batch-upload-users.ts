import { get } from "lodash";
import { ExcelToJSON } from "../../../../../config/excel-to-json/make-excel-to-json";
import { HashPassword } from "../../../../../config/password/hash-password";
import { ExcelTemplateSheet } from "../../../../../constants/excel-template-sheet";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import {
  BatchUploadUsers,
  IBatchUploadUsers,
} from "../../../../../use-cases/user/batch-upload-users";
import { GetUserByEmail } from "../../../../../use-cases/user/get-user-by-email";

export default function makeBatchUploadUsersController({
  hashPassword,
  getUserByEmail,
  batchUploadUsers,
  excelToJSON,
}: {
  hashPassword: HashPassword;
  getUserByEmail: GetUserByEmail;
  batchUploadUsers: BatchUploadUsers;
  excelToJSON: ExcelToJSON;
}) {
  return async function batchUploadUsersController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const file = <IFileMeta>get(httpRequest, "context.file", {});

      const payload = <IBatchUploadUsers[]>excelToJSON({
        source: file.path,
        sheet: ExcelTemplateSheet.USER,
      });

      const batch_payload_promises = payload.map(async (user) => {
        const { email, full_name, password, password_confirmation } = user;

        if (!email || !full_name) {
          return;
        }

        const exists = await getUserByEmail({ email });
        if (exists) {
          return;
        }

        const hashed_password = await hashPassword({
          password,
          password_confirmation,
        });

        return { ...user, hash_password: hashed_password };
      });

      const final_payload = await Promise.all(batch_payload_promises);

      const users = await batchUploadUsers(final_payload.filter(Boolean));

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: users,
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

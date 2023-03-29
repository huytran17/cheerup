import { Request } from "express";
import { get } from "lodash";
import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IUpdateAdmin } from "../../../../use-cases/admin/update-admin";
import Storage from "../../../../config/storage";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUploadAdminAvatarController({
  getAdmin,
  updateAdmin,
}: {
  getAdmin: IGetAdmin;
  updateAdmin: IUpdateAdmin;
}) {
  return async function uploadAdminAvatarController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getAdmin({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const file = get(httpRequest, "context.file");

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const current_bucket = get(exists, "avatar.bucket", "");
      const current_key = get(exists, "avatar.key", "");

      const validCredentials = current_bucket && current_key;
      if (!validCredentials) {
        const s3_params = {
          Bucket: current_bucket,
          Key: current_key,
        };

        Storage.deleteS3Object(s3_params);
      }

      const admin_details = Object.assign({}, exists, {
        avatar: file,
      });

      const updated_admin = await updateAdmin({
        adminDetails: admin_details,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_admin,
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

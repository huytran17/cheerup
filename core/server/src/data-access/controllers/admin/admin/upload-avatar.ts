import { Request } from "express";
import { get } from "lodash";
import {
  GetAdmin,
  IGetAdminPayload,
} from "../../../../use-cases/admin/get-admin";
import { UpdateAdmin } from "../../../../use-cases/admin/update-admin";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import deleteS3Object from "../../../../utils/delete-s3-object";

export default function makeUploadAvatarController({
  getAdmin,
  updateAdmin,
}: {
  getAdmin: GetAdmin;
  updateAdmin: UpdateAdmin;
}) {
  return async function uploadAdminAvatarController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetAdminPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getAdmin({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const file = get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const bucket = <string>get(exists, "avatar.bucket", "");
      const key = <string>get(exists, "avatar.key", "");

      deleteS3Object({ bucket, key });

      const admin_details = {
        ...exists,
        avatar: file,
      };

      const updated_admin = await updateAdmin(admin_details);

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

import { Request } from "express";
import { get } from "lodash";
import { IDiskUpload } from "../../../../../config/multer/make-disk-upload";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import {
  GetAdmin,
  IGetAdminPayload,
} from "../../../../../use-cases/admin/get-admin";
import { UpdateAdmin } from "../../../../../use-cases/admin/update-admin";
import deleteUploadedFile from "../../../../../utils/delete-uploaded-file";
import getFIleUploadedPath from "../../../../../utils/get-file-uploaded-path";
import { isEmpty } from "../../../../../utils/is-empty";

export default function makeUploadAdminAvatarController({
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

      const file = <IDiskUpload>get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      deleteUploadedFile(exists.avatar_url);

      const avatar = {
        ...file,
        path: getFIleUploadedPath(file.path),
        destination: getFIleUploadedPath(file.destination),
      };

      const updated_admin = await updateAdmin({
        ...exists,
        avatar,
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

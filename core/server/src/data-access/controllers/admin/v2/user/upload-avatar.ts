import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import {
  GetUser,
  IGetUserPayload,
} from "../../../../../use-cases/user/get-user";
import { UpdateUser } from "../../../../../use-cases/user/update-user";
import deleteUploadedFile from "../../../../../utils/delete-uploaded-file";
import getFIleUploadedPath from "../../../../../utils/get-file-uploaded-path";
import { isEmpty } from "../../../../../utils/is-empty";

export default function makeUploadUserAvatarController({
  getUser,
  updateUser,
}: {
  getUser: GetUser;
  updateUser: UpdateUser;
}) {
  return async function uploadUserAvatarController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getUser({ _id });

      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const file = <IFileInfo>get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      deleteUploadedFile(exists.avatar_url);

      const updated_user = await updateUser({
        ...exists,
        avatar: {
          ...file,
          path: getFIleUploadedPath(file.path),
          destination: getFIleUploadedPath(file.destination),
        },
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_user,
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

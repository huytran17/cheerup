import { Request } from "express";
import { get } from "lodash";
import { GetUser, IGetUserPayload } from "../../../../use-cases/user/get-user";
import { UpdateUser } from "../../../../use-cases/user/update-user";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import deleteS3Object from "../../../../utils/delete-s3-object";
import IUser from "../../../../database/interfaces/user";

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
      const { _id: user_id } = <IUser>get(httpRequest, "context.user", {});

      const { _id } = <IGetUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      if (user_id !== _id) {
        throw new Error("Access denied");
      }

      const exists = await getUser({ _id });

      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const file = get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const bucket = <string>get(exists, "avatar.bucket", "");
      const key = <string>get(exists, "avatar.key", "");

      deleteS3Object({ bucket, key });

      const user_details = {
        ...exists,
        avatar: file,
      };

      const updated_user = await updateUser(user_details);

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

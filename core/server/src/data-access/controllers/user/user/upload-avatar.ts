import { Request } from "express";
import { get, merge } from "lodash";
import { GetUser } from "../../../../use-cases/user/get-user";
import { UpdateUser } from "../../../../use-cases/user/update-user";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import deleteS3Object from "../../../../utils/delete-s3-object";

export default function makeUploadUserAvatarController({
  getUser,
  updateUser,
}: {
  getUser: GetUser;
  updateUser: UpdateUser;
}) {
  return async function uploadUserAvatarController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getUser({ _id, is_include_deleted: false });

      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const file = get(httpRequest, "context.file");

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const bucket = get(exists, "avatar.bucket");
      const key = get(exists, "avatar.key");

      deleteS3Object({ bucket, key });

      const user_details = merge({}, exists, {
        avatar: file,
      });

      const updated_user = await updateUser({
        userDetails: user_details,
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

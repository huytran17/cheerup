import { Request } from "express";
import * as _ from "lodash";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import Storage from "../../../../config/storage";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeUploadUserAvatarController({
  getUser,
  updateUser,
}: {
  getUser: IGetUser;
  updateUser: IUpdateUser;
}) {
  return async function uploadUserAvatarController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = _.get(httpRequest, "context.validated");

      const exists = await getUser({ _id });
      const user_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (user_not_exists) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const file = _.get(httpRequest, "context.file");
      const file_not_exists = _.isEmpty(file) || _.isNil(file);
      if (file_not_exists) {
        throw new Error(`File does not exist`);
      }

      const current_bucket = _.get(exists, "avatar.bucket", "");
      const current_key = _.get(exists, "avatar.key", "");

      const validCredentials = current_bucket && current_key;
      if (!validCredentials) {
        const s3_params = {
          Bucket: current_bucket,
          Key: current_key,
        };

        Storage.deleteS3Object(s3_params);
      }

      const user_details = Object.assign({}, exists, {
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

import { Request } from "express";
import * as _ from "lodash";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IUpdateUser } from "../../../../use-cases/user/update-user";

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
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `User does not exists.`,
          },
        };
      }

      const file = _.get(httpRequest, "context.file");
      if (!file) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `File does not exists.`,
          },
        };
      }

      const aws_payload = {
        mime_type: file.mimetype,
        dirname: file.key,
        size: file.size,
        name: file.originalname,
        meta: {
          bucket: file.bucket,
          acl: file.bucket,
          ...file,
        },
      };

      const user_details = Object.assign({}, exists, {
        avatar: aws_payload,
      });

      const updated_user = await updateUser({
        userDetails: user_details,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_user,
        }, // TODO: add in implementation of resource
      };
    } catch (err) {
      // TODO: add in error handling here
      // TODO: revert the file upload that was done
      // await session.abortTransaction();
      console.error(err);
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 404,
        body: {
          error: err.message,
        },
      };
    }
  };
}

import { GetUser } from "../../../../use-cases/user/get-user";
import {
  IUpdateUserPayload,
  UpdateUser,
} from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HashPassword } from "../../../../config/password/hash-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdateUserPasswordController({
  getUser,
  updateUser,
  hashPassword,
  logger,
}: {
  getUser: GetUser;
  updateUser: UpdateUser;
  hashPassword: HashPassword;
  logger: Logger;
}) {
  return async function updateUserPasswordController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id, password, password_confirmation } = <IUpdateUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getUser({ _id });
      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const hashed_password = await hashPassword({
        password,
        password_confirmation,
      });

      const user_details = merge({}, exists, {
        hash_password: hashed_password,
      });

      const updated_user = await updateUser({
        userDetails: user_details,
      });

      logger.verbose(`Updated password for user ${exists.email}`);

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

import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HashPassword } from "../../../../config/password/hash-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetUser } from "../../../../use-cases/user/get-user";
import { ResetLoginFailedTimes } from "../../../../use-cases/user/reset-login-failed-times";
import {
  IUpdateUser,
  UpdateUser,
} from "../../../../use-cases/user/update-user";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdateUserPasswordController({
  getUser,
  updateUser,
  hashPassword,
  resetLoginFailedTimes,
  logger,
}: {
  getUser: GetUser;
  updateUser: UpdateUser;
  hashPassword: HashPassword;
  resetLoginFailedTimes: ResetLoginFailedTimes;
  logger: Logger;
}) {
  return async function updateUserPasswordController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id, password, password_confirmation } = <IUpdateUser>(
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

      const user_details = {
        ...exists,
        hash_password: hashed_password,
      };

      const updated_user = await updateUser(user_details);

      logger.verbose(`Updated password for user ${exists.email}`);

      await resetLoginFailedTimes({ _id: exists._id });

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

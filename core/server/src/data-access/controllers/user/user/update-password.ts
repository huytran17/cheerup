import { GetUser } from "../../../../use-cases/user/get-user";
import {
  IUpdateUserPayload,
  UpdateUser,
} from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HashPassword } from "../../../../config/password/hash-password";
import { VerifyPassword } from "../../../../config/password/verify-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import IUser from "../../../../database/interfaces/user";

export default function makeUpdatePasswordController({
  getUser,
  updateUser,
  hashPassword,
  verifyPassword,
  logger,
}: {
  getUser: GetUser;
  updateUser: UpdateUser;
  hashPassword: HashPassword;
  verifyPassword: VerifyPassword;
  logger: Logger;
}) {
  return async function updatePasswordController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { password, new_password, password_confirmation } = <
        IUpdateUserPayload
      >get(httpRequest, "context.validated", {});

      const { _id } = <IUser>get(httpRequest, "context.user", {});

      const exists = await getUser({ _id });
      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const is_socialite_account = get(exists, "socialite.provider");
      if (is_socialite_account) {
        throw new Error(`Can not update password for socialite account ${_id}`);
      }

      const current_password = get(exists, "hash_password");
      const is_valid_password = await verifyPassword({
        password,
        hash_password: current_password,
      });

      if (!is_valid_password) {
        throw new Error(`Current password is invalid`);
      }

      const hashed_password = await hashPassword({
        password: new_password,
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

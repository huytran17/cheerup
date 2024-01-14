import { UpdateUser } from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HashPassword } from "../../../../config/password/hash-password";
import { VerifyPassword } from "../../../../config/password/verify-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";

interface IPayload {
  password: string;
  new_password: string;
  password_confirmation: string;
}

export default function makeUpdatePasswordController({
  updateUser,
  hashPassword,
  verifyPassword,
  logger,
}: {
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
      const { password, new_password, password_confirmation } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = <IUser>get(httpRequest, "context.user", {});

      const is_socialite_account = get(exists, "socialite.provider");
      if (is_socialite_account) {
        throw new Error(
          `Can not update password for socialite account ${exists._id}`
        );
      }

      const is_valid_password = await verifyPassword({
        password,
        hash_password: exists.hash_password,
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

import { IGetUser } from "../../../../use-cases/user/get-user";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { IHashPassword } from "../../../../config/password/hash-password";
import { IVerifyPassword } from "../../../../config/password/verify-password";

export default function makeUpdatePasswordController({
  getUser,
  updateUser,
  hashPassword,
  verifyPassword,
  logger,
}: {
  getUser: IGetUser;
  updateUser: IUpdateUser;
  hashPassword: IHashPassword;
  verifyPassword: IVerifyPassword;
  logger: Logger;
}) {
  return async function updatePasswordController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id, password, new_password, password_confirmation } = _.get(
        httpRequest,
        "context.validated"
      );
      const exists = await getUser({ _id });
      const not_exists = !exists || _.isNil(exists);
      if (not_exists) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const current_password = _.get(exists, "hash_password");
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

      const user_details = Object.assign({}, exists, {
        hash_password: hashed_password,
      });

      const updated_user = await updateUser({
        userDetails: user_details,
      });

      logger.verbose(`Updated password for user ${_id}`);

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_user,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}

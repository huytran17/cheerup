import { Request } from "express";
import { Logger } from "winston";
import _ from "lodash";
import { ICreateUser } from "../../../../use-cases/user/create-user";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { IHashPassword } from "../../../../config/password/hash-password";
import User from "../../../../database/entities/user";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export type IUserRawData = Omit<User, "hash_password"> & {
  email: string;
  password: string;
  password_confirmation: string;
};

export default function makeCreateUserController({
  createUser,
  getUserByEmail,
  hashPassword,
  logger,
}: {
  createUser: ICreateUser;
  getUserByEmail: IGetUserByEmail;
  hashPassword: IHashPassword;
  logger: Logger;
}) {
  return async function createUserController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const admin = _.get(httpRequest, "context.user");
      const user: IUserRawData = _.get(httpRequest, "context.validated");
      const { email, password, password_confirmation, is_blocked_comment } =
        user;

      const exists = await getUserByEmail({ email });
      if (exists) {
        throw new Error(`User by ${email} already exists`);
      }

      const hashed_password = await hashPassword({
        password,
        password_confirmation,
      });

      const final_user_details = Object.assign(
        {},
        _.omit(user, ["_id", "password", "password_confirmation"]),
        {
          email,
          hash_password: hashed_password,
          created_by: admin,
          is_blocked_comment,
          blocked_comment_at: is_blocked_comment ? new Date() : null,
        }
      );

      const created_user = await createUser({
        userDetails: final_user_details,
      });

      logger.verbose(`User signed up: ${created_user.email}`);

      return {
        headers,
        statusCode: 201,
        body: {
          data: created_user,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

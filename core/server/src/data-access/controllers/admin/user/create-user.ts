import { Request } from "express";
import { Logger } from "winston";
import _ from "lodash";
import { ISignUp } from "../../../../use-cases/auth/sign-up";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { IHashPassword } from "../../../../config/password/hash-password";
import User from "../../../../database/entities/user";

export type IUserRawData = Omit<User, "hash_password"> & {
  email: string;
  password: string;
  password_confirmation: string;
};

export default function makeCreateUserController({
  signUp,
  getUserByEmail,
  hashPassword,
  logger,
}: {
  signUp: ISignUp;
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
      const user: IUserRawData = _.get(httpRequest, "context.validated");
      const { email, password, password_confirmation } = user;

      const exists = await getUserByEmail({ email });
      if (exists) {
        throw new Error(`User by ${email} already exists`);
      }

      const hashed_password = await hashPassword({
        password,
        password_confirmation,
      });

      const user_details = Object.assign(
        {},
        _.omit(user, ["_id", "password", "password_confirmation"]),
        {
          email,
          hash_password: hashed_password,
        }
      );

      const created_user = await signUp({
        userDetails: user_details,
      });

      logger.verbose(`User signed up: ${created_user.email}`);

      return {
        headers,
        statusCode: 201,
        body: {
          data: created_user,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

import { Request } from "express";
import { Logger } from "winston";
import { get, omit, merge } from "lodash";
import {
  CreateUser,
  ICreateUserPayload,
} from "../../../../use-cases/user/create-user";
import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { HashPassword } from "../../../../config/password/hash-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeSignUpController({
  createUser,
  getUserByEmail,
  hashPassword,
  logger,
}: {
  createUser: CreateUser;
  getUserByEmail: GetUserByEmail;
  hashPassword: HashPassword;
  logger: Logger;
}) {
  return async function signUpController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const client_ip: string = get(httpRequest, "context.ip", "");
      const user = <ICreateUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      const { email, password, password_confirmation } = user;

      const exists = await getUserByEmail({ email });
      if (!isEmpty(exists)) {
        throw new Error(`User by ${email} already exists`);
      }

      const hashed_password = await hashPassword({
        password,
        password_confirmation,
      });

      const user_details = merge(
        {},
        omit(user, ["_id", "password", "password_confirmation"]),
        {
          email,
          hash_password: hashed_password,
          ip: client_ip,
        }
      );

      const created_user = await createUser({
        userDetails: user_details,
      });

      logger.verbose(`Created user: ${created_user.email}`);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_user,
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

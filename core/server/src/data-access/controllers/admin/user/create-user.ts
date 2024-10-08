import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HashPassword } from "../../../../config/password/hash-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import {
  CreateUser,
  ICreateUser,
} from "../../../../use-cases/user/create-user";
import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateUserController({
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
  return async function createUserController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const admin = <IAdmin>get(httpRequest, "context.user", {});

      const user = <ICreateUser>get(httpRequest, "context.validated", {});

      const { email, password, password_confirmation, is_blocked_comment } =
        user;

      const exists = await getUserByEmail({ email });
      if (!isEmpty(exists)) {
        throw new Error(`User by ${email} already exists`);
      }

      const hashed_password = await hashPassword({
        password,
        password_confirmation,
      });

      const final_user_details = {
        ...user,
        email,
        hash_password: hashed_password,
        created_by: admin,
        is_blocked_comment,
        blocked_comment_at: is_blocked_comment ? new Date() : null,
      };

      const created_user = await createUser(final_user_details);

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

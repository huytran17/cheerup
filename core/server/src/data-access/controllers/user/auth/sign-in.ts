import _ from "lodash";
import { Request } from "express";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { IGenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";
import { IVerifyPassword } from "../../../../config/password/verify-password";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export type ILoginData = {
  email: string;
  password: string;
};

export default function makeSignInController({
  getUserByEmail,
  generateAccessToken,
  verifyPassword,
  logger,
}: {
  getUserByEmail: IGetUserByEmail;
  generateAccessToken: IGenerateAccessToken;
  verifyPassword: IVerifyPassword;
  logger: Logger;
}) {
  return async function signInController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const payload: ILoginData = _.get(httpRequest, "context.validated");
      const { email, password } = payload;

      const exists = await getUserByEmail({ email, is_include_deleted: false });
      if (isEmpty(exists)) {
        throw new Error(`User by ${email} does not exist`);
      }

      const valid_password = await verifyPassword({
        password,
        hash_password: exists.hash_password,
      });

      const valid_authentication = exists && valid_password;
      if (!valid_authentication) {
        throw new Error(`Email or password mismatch`);
      }

      const access_token = await generateAccessToken(
        { email },
        { expiresIn: "1y" }
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: {
            access_token,
            user: exists,
          },
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          error: error.message,
        },
      };
    }
  };
}

import { get, omit } from "lodash";
import { Request } from "express";
import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { GenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";
import { VerifyPassword } from "../../../../config/password/verify-password";
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
}: {
  getUserByEmail: GetUserByEmail;
  generateAccessToken: GenerateAccessToken;
  verifyPassword: VerifyPassword;
}) {
  return async function signInController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const payload: ILoginData = get(httpRequest, "context.validated");
      const { email, password }: { email: string; password: string } = payload;

      const exists = await getUserByEmail({ email, is_include_deleted: false });
      if (isEmpty(exists)) {
        throw new Error(`User by ${email} does not exist`);
      }

      const hash_password = exists.hash_password;
      const valid_password = await verifyPassword({
        password,
        hash_password,
      });

      const valid_authentication = exists && valid_password;
      if (!valid_authentication) {
        throw new Error(`Email or password mismatch`);
      }

      const access_token = await generateAccessToken(
        { email, hash_password },
        { expiresIn: "1y" }
      );

      const token_age_in_seconds = 60 * 60 * 24 * 365;
      headers[
        "Set-Cookie"
      ] = `access_token="${access_token}; Max-Age=${token_age_in_seconds}; HttpOnly=true; Path=/`;

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: {
            access_token,
            user: omit(exists, "tfa_secret"),
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

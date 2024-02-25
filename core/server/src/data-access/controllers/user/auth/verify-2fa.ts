import { Request } from "express";
import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { tfa } from "../../../../config/tfa";
import { isEmpty } from "../../../../utils/is-empty";
import { GetUserTfaSecretByEmail } from "../../../../use-cases/user/get-user-tfa-secret-by-email";
import { GenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";

interface IPayload {
  code: string;
  email: string;
}

export default function makeVerify2FAController({
  getUserByEmail,
  getUserTfaSecretByEmail,
  generateAccessToken,
}: {
  getUserByEmail: GetUserByEmail;
  getUserTfaSecretByEmail: GetUserTfaSecretByEmail;
  generateAccessToken: GenerateAccessToken;
}) {
  return async function verify2FAController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { code, email } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const user_exists = await getUserByEmail({ email });

      if (isEmpty(user_exists)) {
        throw new Error(`User by email ${email} does not exist`);
      }

      const { tfa_secret } = await getUserTfaSecretByEmail({ email });

      const is_valid_tfa_code = tfa.verifyToken({
        token: code,
        secret: tfa_secret,
      });

      if (!is_valid_tfa_code) {
        throw new Error(`Invalid confirmation code ${code}`);
      }

      const access_token = await generateAccessToken(
        { _id: user_exists._id },
        { expiresIn: "1y" }
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: { access_token, sign_in: true },
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

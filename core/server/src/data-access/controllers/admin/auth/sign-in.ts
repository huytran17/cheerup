import { get } from "lodash";
import { Request } from "express";
import { GetAdminByEmail } from "../../../../use-cases/admin/get-admin-by-email";
import { GenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";
import { VerifyPassword } from "../../../../config/password/verify-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload {
  email: string;
  password: string;
}

export default function makeSignInController({
  getAdminByEmail,
  generateAccessToken,
  verifyPassword,
}: {
  getAdminByEmail: GetAdminByEmail;
  generateAccessToken: GenerateAccessToken;
  verifyPassword: VerifyPassword;
}) {
  return async function signInController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email, password } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getAdminByEmail({ email });
      if (isEmpty(exists)) {
        throw new Error(`Admin by ${email} does not exist`);
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
        { email, hash_password: exists.hash_password },
        { expiresIn: "1y" }
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: {
            access_token,
            sign_in: true,
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

import { get, pick } from "lodash";
import { Request } from "express";
import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { GenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";
import { VerifyPassword } from "../../../../config/password/verify-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload {
  email: string;
  password: string;
}

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
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    const return_ok = (data: any) => {
      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: { ...data },
      };
    };

    try {
      const { email, password } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getUserByEmail({ email });
      if (isEmpty(exists)) {
        throw new Error(`User by ${email} does not exist`);
      }

      const hash_password = exists.hash_password;
      const valid_password = await verifyPassword({
        password,
        hash_password,
      });

      if (!valid_password) {
        throw new Error(`Email or password mismatch`);
      }

      if (exists.is_enabled_2fa) {
        return return_ok(pick(exists, ["email", "is_enabled_2fa"]));
      }

      const access_token = await generateAccessToken(
        { _id: exists._id },
        { expiresIn: "1y" }
      );

      return return_ok({
        access_token,
        sign_in: true,
      });
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

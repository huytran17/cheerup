import { Request } from "express";
import { get } from "lodash";
import { GenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";
import { VerifyPassword } from "../../../../config/password/verify-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { LoginFailed } from "../../../../constants/login-failed-times";
import { GetAdminByEmail } from "../../../../use-cases/admin/get-admin-by-email";
import { IncreaseLoginFailedTimes } from "../../../../use-cases/admin/increase-login-failed-times";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload {
  email: string;
  password: string;
}

export default function makeSignInController({
  getAdminByEmail,
  generateAccessToken,
  verifyPassword,
  increaseLoginFailedTimes,
}: {
  getAdminByEmail: GetAdminByEmail;
  generateAccessToken: GenerateAccessToken;
  verifyPassword: VerifyPassword;
  increaseLoginFailedTimes: IncreaseLoginFailedTimes;
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

      const login_failed_times = exists.login_failed_times || 0;

      if (login_failed_times >= LoginFailed.MAX) {
        throw new Error("Too many login failures");
      }

      const valid_password = await verifyPassword({
        password,
        hash_password: exists.hash_password,
      });

      if (!valid_password) {
        await increaseLoginFailedTimes({ _id: exists._id });
        throw new Error(`Email or password mismatch`);
      }

      const access_token = await generateAccessToken(
        { _id: exists._id },
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

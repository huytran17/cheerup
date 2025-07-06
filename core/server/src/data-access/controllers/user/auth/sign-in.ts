import { Request } from "express";
import { get, pick } from "lodash";
import { GenerateAccessToken } from "../../../../config/access-token-manager/generate-access-token";
import { VerifyPassword } from "../../../../config/password/verify-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { LoginFailed } from "../../../../constants/login-failed-times";
import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { IncreaseLoginFailedTimes } from "../../../../use-cases/user/increase-login-failed-times";
import { ResetLoginFailedTimes } from "../../../../use-cases/user/reset-login-failed-times";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload {
  email: string;
  password: string;
}

export default function makeSignInController({
  getUserByEmail,
  generateAccessToken,
  verifyPassword,
  increaseLoginFailedTimes,
  resetLoginFailedTimes,
}: {
  getUserByEmail: GetUserByEmail;
  generateAccessToken: GenerateAccessToken;
  verifyPassword: VerifyPassword;
  increaseLoginFailedTimes: IncreaseLoginFailedTimes;
  resetLoginFailedTimes: ResetLoginFailedTimes;
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
        body: {
          data: { ...data },
        },
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

      const login_failed_times = exists.login_failed_times || 0;

      if (login_failed_times >= LoginFailed.MAX) {
        throw new Error(
          "Too many failed login attempts, please reset your password or contact the administrator"
        );
      }

      const valid_password = await verifyPassword({
        password,
        hash_password: exists.hash_password,
      });

      if (!valid_password) {
        await increaseLoginFailedTimes({ _id: exists._id });
        throw new Error("Invalid credentials");
      }

      if (exists.is_enabled_2fa) {
        return return_ok(pick(exists, ["email", "is_enabled_2fa"]));
      }

      const [access_token] = await Promise.all([
        generateAccessToken({ _id: exists._id }, { expiresIn: "1y" }),
        resetLoginFailedTimes({ _id: exists._id }),
      ]);

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

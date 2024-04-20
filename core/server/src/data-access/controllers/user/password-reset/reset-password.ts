import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { get } from "lodash";
import { VerifyAccessToken } from "../../../../config/accessTokenManager/verify-access-token";
import { HashPassword } from "../../../../config/password/hash-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPasswordReset } from "../../../../use-cases/password-reset/get-password-reset";
import { HardDeletePasswordReset } from "../../../../use-cases/password-reset/hard-delete-password-reset";
import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { ResetLoginFailedTimes } from "../../../../use-cases/user/reset-login-failed-times";
import { UpdateUser } from "../../../../use-cases/user/update-user";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload {
  password: string;
  password_confirmation: string;
}

interface IVerifycationTokenPayload {
  verification_token: string;
}

export default function makeResetPasswordController({
  getPasswordReset,
  hardDeletePasswordReset,
  getUserByEmail,
  updateUser,
  verifyAccessToken,
  hashPassword,
  resetLoginFailedTimes,
}: {
  getPasswordReset: GetPasswordReset;
  hardDeletePasswordReset: HardDeletePasswordReset;
  getUserByEmail: GetUserByEmail;
  updateUser: UpdateUser;
  verifyAccessToken: VerifyAccessToken;
  hashPassword: HashPassword;
  resetLoginFailedTimes: ResetLoginFailedTimes;
}) {
  return async function resetPasswordController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { verification_token } = <IVerifycationTokenPayload>(
        get(httpRequest, "cookies")
      );

      const { password, password_confirmation } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const decoded = <JwtPayload>verifyAccessToken(verification_token);

      const password_reset_exists = await getPasswordReset({
        _id: decoded._id,
      });

      if (isEmpty(password_reset_exists)) {
        throw new Error(`PasswordReset by id ${decoded._id} does not exists`);
      }

      const user_exists = await getUserByEmail({
        email: password_reset_exists.email,
      });

      if (isEmpty(user_exists)) {
        throw new Error(
          `User by email ${password_reset_exists.email} does not exists`
        );
      }

      const hash_password = await hashPassword({
        password,
        password_confirmation,
      });

      const updated_user = await updateUser({ ...user_exists, hash_password });

      await Promise.all([
        hardDeletePasswordReset({ _id: decoded._id }),
        resetLoginFailedTimes({ _id: user_exists._id }),
      ]);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: {
            ...updated_user,
            is_verified_reset_pwd: true,
          },
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

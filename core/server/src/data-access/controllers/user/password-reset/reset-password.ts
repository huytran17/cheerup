import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IGetPasswordReset } from "../../../../use-cases/password-reset/get-password-reset";
import { IHardDeletePasswordReset } from "../../../../use-cases/password-reset/hard-delete-password-reset";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import { IVerifyAccessToken } from "../../../../config/accessTokenManager/verify-access-token";
import { IHashPassword } from "../../../../config/password/hash-password";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeResetPasswordController({
  getPasswordReset,
  hardDeletePasswordReset,
  getUserByEmail,
  updateUser,
  verifyAccessToken,
  hashPassword,
}: {
  getPasswordReset: IGetPasswordReset;
  hardDeletePasswordReset: IHardDeletePasswordReset;
  getUserByEmail: IGetUserByEmail;
  updateUser: IUpdateUser;
  verifyAccessToken: IVerifyAccessToken;
  hashPassword: IHashPassword;
}) {
  return async function resetPasswordController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { verification_token, password, password_confirmation } = get(
        httpRequest,
        "context.validated"
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

      const user_details = { ...user_exists, hash_password };

      const updated_user = await updateUser({ userDetails: user_details });

      await hardDeletePasswordReset({ _id: decoded._id });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_user,
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

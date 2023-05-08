import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IVerifyAccessToken } from "../../../../config/accessTokenManager/verify-access-token";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeVerifyAccessController({
  verifyAccessToken,
  getUserByEmail,
}: {
  verifyAccessToken: IVerifyAccessToken;
  getUserByEmail: IGetUserByEmail;
}) {
  return async function verifyAccessController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { access_token } = get(httpRequest, "context.validated");

      if (!access_token) {
        throw new Error(`Invalid access token`);
      }

      const decoded_access_token = <JwtPayload>verifyAccessToken(access_token);

      const user_exists = await getUserByEmail({
        email: decoded_access_token.email,
        is_include_deleted: false,
      });

      if (isEmpty(user_exists)) {
        throw new Error(`User by email ${user_exists.email} does not exist`);
      }

      const is_socialite = get(user_exists, "socialite.provider");

      if (!is_socialite) {
        const invalid_password =
          user_exists.hash_password !== decoded_access_token.hash_password;

        if (invalid_password) {
          throw new Error(`Invalid access token`);
        }
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: decoded_access_token,
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

import { VerifyAccessToken } from "../../../../config/accessTokenManager/verify-access-token";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { get, omit } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

interface IPayload {
  access_token: string;
}

export default function makeVerifyAccessController({
  verifyAccessToken,
}: {
  verifyAccessToken: VerifyAccessToken;
}) {
  return async function verifyAccessController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { access_token } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );
      const decoded_access_token = <JwtPayload>verifyAccessToken(access_token);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: omit(decoded_access_token, "hash_password"),
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

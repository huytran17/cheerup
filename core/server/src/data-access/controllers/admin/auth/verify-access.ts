import { IVerifyAccessToken } from "../../../../config/accessTokenManager/verify-access-token";
import { Request } from "express";
import { get, pick } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeVerifyAccessController({
  verifyAccessToken,
}: {
  verifyAccessToken: IVerifyAccessToken;
}) {
  return async function verifyAccessController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { access_token }: { access_token: string } = get(
        httpRequest,
        "context.validated"
      );
      const decoded_access_token = verifyAccessToken(access_token);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: pick(decoded_access_token, ["iat", "exp"]),
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

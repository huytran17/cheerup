import { IVerifyAccessToken } from "../../../../config/accessTokenManager/verify-access-token";
import { Request } from "express";
import _ from "lodash";

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
      const { access_token } = _.get(httpRequest, "context.validated");
      const decoded_access_token = verifyAccessToken(access_token);

      const exists = !!decoded_access_token;
      if (!exists) {
        throw new Error(`User is not logged in`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: access_token,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}

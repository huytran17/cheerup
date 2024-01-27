import { get } from "lodash";
import { Request } from "express";
import { GenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";

export default function makeSignInWithGoogleController({
  generateAccessToken,
}: {
  generateAccessToken: GenerateAccessToken;
}) {
  return async function signInWithGoogleController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IUser>get(httpRequest, "context.user", {});

      const access_token = await generateAccessToken(
        { _id },
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

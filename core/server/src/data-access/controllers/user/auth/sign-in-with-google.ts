import { get } from "lodash";
import { Request } from "express";
import { GenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { renderPageContent } from "../../../../config/client";
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
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Content-Security-Policy":
        "default-src * 'unsafe-inline' ; script-src 'unsafe-inline';",
      "X-Content-Security-Policy":
        "default-src * 'unsafe-inline' ; script-src 'unsafe-inline';",
      "X-WebKit-CSP":
        "default-src * 'unsafe-inline' ; script-src 'unsafe-inline';",
    };

    try {
      const { email } = <IUser>get(httpRequest, "context.user", {});

      const access_token = await generateAccessToken(
        { email },
        { expiresIn: "1y" }
      );

      const rendered_page_content = renderPageContent({
        type: "home",
        data: { access_token },
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: rendered_page_content,
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

import { get } from "lodash";
import { Request } from "express";
import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { GenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import { renderPageContent } from "../../../../config/client";

export type ILoginData = {
  email: string;
  password: string;
};

export default function makeSignInWithGoogleController({
  getUserByEmail,
  generateAccessToken,
}: {
  getUserByEmail: GetUserByEmail;
  generateAccessToken: GenerateAccessToken;
}) {
  return async function signInWithGoogleController(
    httpRequest: Request & { context: { validated: {} } }
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
      const { email }: { email: string } = get(httpRequest, "context.user");

      const exists = await getUserByEmail({
        email,
        is_include_deleted: false,
      });

      if (isEmpty(exists)) {
        throw new Error(`User by ${email} does not exist`);
      }

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

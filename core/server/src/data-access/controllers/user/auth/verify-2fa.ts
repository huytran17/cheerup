import { Request } from "express";
import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { get, omit, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { tfa } from "../../../../config/tfa";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeVerify2FAController({
  getUserByEmail,
}: {
  getUserByEmail: GetUserByEmail;
}) {
  return async function verify2FAController(
    httpRequest: Request & { context: { validated: { user_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { code, email } = get(httpRequest, "context.validated");

      const user_exists = await getUserByEmail({ email });

      if (isEmpty(user_exists)) {
        throw new Error(`User by email ${email} does not exist`);
      }

      const is_valid_tfa_code = tfa.verifyToken({
        token: code,
        secret: user_exists.tfa_secret,
      });

      if (!is_valid_tfa_code) {
        throw new Error(`Invalid confirmation code ${code}`);
      }

      const final_user_data = merge(
        {},
        omit(user_exists, ["hash_password", "tfa_secret"])
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_user_data,
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

import { Request } from "express";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { get, omit } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetUserByEmailController({
  getUserByEmail,
}: {
  getUserByEmail: IGetUserByEmail;
}) {
  return async function getUserByEmailController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email }: { email: string } = get(
        httpRequest,
        "context.validated"
      );

      const exists = await getUserByEmail({ email });
      if (isEmpty(exists)) {
        throw new Error(`User ${email} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: omit(exists, ["hash_password", "tfa_secret"]),
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

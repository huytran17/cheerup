import { GetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import IUser from "../../../../database/interfaces/user";

export default function makeSignOutController({
  getUserByEmail,
}: {
  getUserByEmail: GetUserByEmail;
}) {
  return async function signOutController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = <IUser>get(httpRequest, "context.user", {});

      const exists = await getUserByEmail({ email });
      if (isEmpty(exists)) {
        throw new Error(`User by ${email} does not exist`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: {
            valid_signout: true,
          },
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
          valid_signout: false,
        },
      };
    }
  };
}

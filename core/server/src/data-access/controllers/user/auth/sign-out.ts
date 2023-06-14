import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeSignOutController({
  getUserByEmail,
}: {
  getUserByEmail: IGetUserByEmail;
}) {
  return async function signOutController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email }: { email: string } = get(httpRequest, "context.user");

      const exists = await getUserByEmail({ email, is_include_deleted: false });
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

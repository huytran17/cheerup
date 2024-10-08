import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetUserByEmail,
  IGetUserByEmail,
} from "../../../../use-cases/user/get-user-by-email";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetUserByEmailController({
  getUserByEmail,
}: {
  getUserByEmail: GetUserByEmail;
}) {
  return async function getUserByEmailController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = <IGetUserByEmail>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getUserByEmail({ email });
      if (isEmpty(exists)) {
        throw new Error(`User ${email} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
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

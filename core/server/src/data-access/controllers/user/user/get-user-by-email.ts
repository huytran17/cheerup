import { Request } from "express";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { IGetUser } from "../../../../use-cases/user/get-user";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetUserByEmailController({
  getUserByEmail,
  getUser,
}: {
  getUserByEmail: IGetUserByEmail;
  getUser: IGetUser;
}) {
  return async function getuserByEmailController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = _.get(httpRequest, "context.validated");

      const exists = await getUserByEmail({ email, is_include_deleted: false });

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

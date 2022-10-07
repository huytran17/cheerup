import { Request } from "express";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { IGetUser } from "../../../../use-cases/user/get-user";
import _ from "lodash";

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

      const { _id } = _.get(httpRequest, "context.user");

      const current_exists = await getUser({
        _id,
        is_include_deleted: false,
      });
      const current_user_not_exists =
        _.isEmpty(current_exists) || _.isNil(current_exists);
      if (current_user_not_exists) {
        throw new Error(`Current user by id ${_id} does not exists`);
      }

      const exists = await getUserByEmail({ email, is_include_deleted: false });
      const user_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (user_not_exists) {
        throw new Error(`User ${email} does not exists`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}

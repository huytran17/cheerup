import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetUserController({
  getUser,
  logger,
}: {
  getUser: IGetUser;
  logger: Logger;
}) {
  return async function getUserController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { user_id } = _.get(httpRequest, "context.validated");

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

      const exists = await getUser({ _id: user_id, is_include_deleted: false });
      const user_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (user_not_exists) {
        throw new Error(`User by ${user_id} does not exist`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}

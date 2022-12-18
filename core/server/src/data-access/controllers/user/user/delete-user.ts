import { IGetUser } from "../../../../use-cases/user/get-user";
import { IDeleteUser } from "../../../../use-cases/user/delete-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteUserController({
  getUser,
  deleteUser,
  logger,
}: {
  getUser: IGetUser;
  deleteUser: IDeleteUser;
  logger: Logger;
}) {
  return async function deleteUserController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");

      const { _id: curent_user_id } = _.get(httpRequest, "context.user");

      const current_exists = await getUser({
        _id: curent_user_id,
        is_include_deleted: false,
      });
      const current_user_not_exists =
        _.isEmpty(current_exists) || _.isNil(current_exists);
      if (current_user_not_exists) {
        throw new Error(`Current user by id ${_id} does not exists`);
      }

      const exists = await getUser({ _id, is_include_deleted: false });

      const user_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (user_not_exists) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const deleted_user = await deleteUser({ _id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted_user,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error,
        },
      };
    }
  };
}

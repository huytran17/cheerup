import { IGetUser } from "../../../../use-cases/user/get-user";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeUpdateUserController({
  getUser,
  updateUser,
  logger,
}: {
  getUser: IGetUser;
  updateUser: IUpdateUser;
  logger: Logger;
}) {
  return async function updateUserController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const userDetails = _.get(httpRequest, "context.validated");
      const { _id } = _.get(httpRequest, "context.user");

      const exists = await getUser({ _id, is_include_deleted: false });
      const user_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (user_not_exists) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const updated_user = await updateUser({ userDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_user,
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

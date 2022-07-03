import { Request } from "express";
import { IGetUsers } from "../../../../use-cases/user/get-users";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetUsersController({
  getUsers,
  logger,
}: {
  getUsers: IGetUsers;
  logger: Logger;
}) {
  return async function getUsersController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const users = await getUsers();

      return {
        headers,
        statusCode: 200,
        body: {
          data: users,
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

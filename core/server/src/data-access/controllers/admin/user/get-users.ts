import { Request } from "express";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetUsers } from "../../../../use-cases/user/get-users";

export default function makeGetUsersController({
  getUsers,
}: {
  getUsers: GetUsers;
}) {
  return async function getUsersController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const users = await getUsers();

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: users,
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

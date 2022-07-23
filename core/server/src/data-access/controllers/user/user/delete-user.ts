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
      const userDetails = _.get(httpRequest, "context.validated");
      const { _id } = userDetails;
      const exists = await getUser({ _id });
      if (!exists) {
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
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

import { IGetUser } from "../../../../use-cases/user/get-user";
import { IHardDeleteUser } from "../../../../use-cases/user/hard-delete-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeHardDeleteUserController({
  getUser,
  hardDeleteUser,
  logger,
}: {
  getUser: IGetUser;
  hardDeleteUser: IHardDeleteUser;
  logger: Logger;
}) {
  return async function hardDeleteUserController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getUser({ _id });
      if (!exists) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const deleted_user = await hardDeleteUser({ _id });
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

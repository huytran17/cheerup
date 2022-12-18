import { IGetUser } from "../../../../use-cases/user/get-user";
import { IRestoreUser } from "../../../../use-cases/user/restore-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeRestoreUserController({
  getUser,
  restoreUser,
  logger,
}: {
  getUser: IGetUser;
  restoreUser: IRestoreUser;
  logger: Logger;
}) {
  return async function restoreUserController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getUser({ _id });
      if (!exists) {
        throw new Error(`User by id ${_id} does not exist`);
      }

      const updated_user = await restoreUser({
        _id,
      });

      logger.verbose(`Restored user ${_id} successfully`);

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

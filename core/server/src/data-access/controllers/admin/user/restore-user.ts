import { IGetUser } from "../../../../use-cases/user/get-user";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeRestoreUserController({
  getUser,
  updateUser,
  logger,
}: {
  getUser: IGetUser;
  updateUser: IUpdateUser;
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

      const updated_user_data = Object.assign({}, exists, {
        deleted_at: null,
      });

      const updated_user = await updateUser({
        userDetails: updated_user_data,
      });

      logger.verbose(`Restored user ${_id} successfully`);

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_user,
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

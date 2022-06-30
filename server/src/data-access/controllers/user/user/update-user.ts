import { IGetUser } from "../../../../use-cases/user/get-user";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";

export default function makeUpdateUser({
  getUserById,
  updateUser,
  logger,
}: {
  getUserById: IGetUser;
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
      const { _id } = userDetails;
      const exists = await getUserById({ _id });
      if (!exists) {
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

import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  DeleteUser,
  IDeleteUser,
} from "../../../../use-cases/user/delete-user";
import { GetUser } from "../../../../use-cases/user/get-user";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeDeleteUserController({
  getUser,
  deleteUser,
  logger,
}: {
  getUser: GetUser;
  deleteUser: DeleteUser;
  logger: Logger;
}) {
  return async function deleteUserController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IDeleteUser>get(httpRequest, "context.validated", {});

      const exists = await getUser({ _id });
      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const deleted_user = await deleteUser({ _id });

      logger.verbose(`Deleted user: ${exists.email}`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted_user,
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

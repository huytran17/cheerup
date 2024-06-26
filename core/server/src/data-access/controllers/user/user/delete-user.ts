import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import {
  DeleteUser,
  IDeleteUserPayload,
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
      const { _id: user_id } = <IUser>get(httpRequest, "context.user", {});

      const { _id } = <IDeleteUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      if (user_id !== _id) {
        throw new Error("Access denied");
      }

      const exists = await getUser({ _id });

      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const deleted_user = await deleteUser({ _id });

      logger.verbose(`Deleted user ${exists.email} successfully`);

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

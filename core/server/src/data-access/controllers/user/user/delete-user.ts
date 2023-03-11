import { IGetUser } from "../../../../use-cases/user/get-user";
import { IDeleteUser } from "../../../../use-cases/user/delete-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

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
      const { _id } = _.get(httpRequest, "context.validated");

      const exists = await getUser({ _id, is_include_deleted: false });

      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const deleted_user = await deleteUser({ _id });
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

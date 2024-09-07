import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetUser } from "../../../../use-cases/user/get-user";
import {
  HardDeleteUser,
  IHardDeleteUser,
} from "../../../../use-cases/user/hard-delete-user";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeHardDeleteUserController({
  getUser,
  hardDeleteUser,
  logger,
}: {
  getUser: GetUser;
  hardDeleteUser: HardDeleteUser;
  logger: Logger;
}) {
  return async function hardDeleteUserController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IHardDeleteUser>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getUser({ _id });
      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const deleted_user = await hardDeleteUser({ _id });

      logger.verbose(`Hard deleted user: ${exists.email}`);

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

import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetSoftDeletedUser,
  IGetSoftDeletedUserPayload,
} from "../../../../use-cases/user/get-soft-deleted-user";
import { RestoreUser } from "../../../../use-cases/user/restore-user";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeRestoreUserController({
  getSoftDeletedUser,
  restoreUser,
  logger,
}: {
  getSoftDeletedUser: GetSoftDeletedUser;
  restoreUser: RestoreUser;
  logger: Logger;
}) {
  return async function restoreUserController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetSoftDeletedUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getSoftDeletedUser({ _id });
      if (isEmpty(exists)) {
        throw new Error(`User by id ${_id} does not exist`);
      }

      const restored_user = await restoreUser({ _id });

      logger.verbose(`Restored user ${exists.email} successfully`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: restored_user,
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

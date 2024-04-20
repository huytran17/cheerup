import {
  IUpdateUserPayload,
  UpdateUser,
} from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeUpdateUserController({
  updateUser,
  logger,
}: {
  updateUser: UpdateUser;
  logger: Logger;
}) {
  return async function updateUserController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const user_details = <IUpdateUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      const updated_user = await updateUser(user_details);

      logger.verbose(`Updated user ${updated_user.email}`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_user,
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

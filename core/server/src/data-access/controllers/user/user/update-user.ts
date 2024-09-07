import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import {
  IUpdateUser,
  UpdateUser,
} from "../../../../use-cases/user/update-user";

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
      const { _id } = <IUser>get(httpRequest, "context.user", {});

      const user_details = <IUpdateUser>(
        get(httpRequest, "context.validated", {})
      );

      if (_id !== user_details._id) {
        throw new Error("Access denied");
      }

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

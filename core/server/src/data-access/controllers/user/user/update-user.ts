import { GetUser } from "../../../../use-cases/user/get-user";
import {
  IUpdateUserPayload,
  UpdateUser,
} from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import IUser from "../../../../database/interfaces/user";

export default function makeUpdateUserController({
  getUser,
  updateUser,
  logger,
}: {
  getUser: GetUser;
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
      const userDetails = <IUpdateUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      const { _id } = <IUser>get(httpRequest, "context.user", {});

      const exists = await getUser({ _id });
      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const updated_user = await updateUser({ userDetails });

      logger.verbose(`Updated user ${exists.email}`);

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

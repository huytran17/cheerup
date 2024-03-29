import { GetUser } from "../../../../use-cases/user/get-user";
import {
  IUpdateUserPayload,
  UpdateUser,
} from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

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

      const { _id, is_blocked_comment } = userDetails;

      const exists = await getUser({ _id });
      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const is_socialite_account = get(exists, "socialite.provider");
      if (is_socialite_account) {
        throw new Error(`Can not update password for socialite account ${_id}`);
      }

      const final_user_details = merge({}, exists, {
        ...userDetails,
        blocked_comment_at: is_blocked_comment ? new Date() : null,
      });

      const updated_user = await updateUser({
        userDetails: final_user_details,
      });

      logger.verbose(`Updated user ${exists.email} successfully`);

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

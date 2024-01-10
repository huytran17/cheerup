import { GetUser, IGetUserPayload } from "../../../../use-cases/user/get-user";
import { UpdateUser } from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUnBlockUserCommentController({
  getUser,
  updateUser,
  logger,
}: {
  getUser: GetUser;
  updateUser: UpdateUser;
  logger: Logger;
}) {
  return async function unblockUserCommentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getUser({ _id });
      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const final_user_details = merge({}, exists, {
        is_blocked_comment: false,
      });

      const updated_user = await updateUser({
        userDetails: final_user_details,
      });

      logger.verbose(`Un-blocked comment for user ${exists.email}`);

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

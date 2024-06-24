import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetUser, IGetUserPayload } from "../../../../use-cases/user/get-user";
import { UpdateUser } from "../../../../use-cases/user/update-user";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeBlockUserCommentController({
  getUser,
  updateUser,
  logger,
}: {
  getUser: GetUser;
  updateUser: UpdateUser;
  logger: Logger;
}) {
  return async function blockUserCommentController(
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

      const final_user_details = {
        ...exists,
        is_blocked_comment: true,
      };

      const updated_user = await updateUser(final_user_details);

      logger.verbose(`Blocked comment for user ${exists.email}`);

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

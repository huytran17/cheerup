import { IGetUser } from "../../../../use-cases/user/get-user";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeBlockUserCommentController({
  getUser,
  updateUser,
  logger,
}: {
  getUser: IGetUser;
  updateUser: IUpdateUser;
  logger: Logger;
}) {
  return async function blockUserCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getUser({ _id });
      if (!exists) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const final_user_details = Object.assign({}, exists, {
        is_blocked_comment: true,
      });

      const updated_user = await updateUser({
        userDetails: final_user_details,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_user,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

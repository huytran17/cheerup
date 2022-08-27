import { IGetUser } from "../../../../use-cases/user/get-user";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeUpdateUserController({
  getUser,
  updateUser,
  logger,
}: {
  getUser: IGetUser;
  updateUser: IUpdateUser;
  logger: Logger;
}) {
  return async function updateUserController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const userDetails = _.get(httpRequest, "context.validated");

      const { _id, is_blocked_comment } = userDetails;

      const exists = await getUser({ _id });
      if (!exists) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const final_user_details = Object.assign({}, exists, {
        ...userDetails,
        blocked_comment_at: is_blocked_comment ? new Date() : null,
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

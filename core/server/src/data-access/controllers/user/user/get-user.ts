import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetUserController({
  getUser,
  logger,
}: {
  getUser: IGetUser;
  logger: Logger;
}) {
  return async function getUserController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { user_id } = _.get(httpRequest, "context.validated");

      const exists = await getUser({ _id: user_id, is_include_deleted: false });
      const user_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (user_not_exists) {
        throw new Error(`User by ${user_id} does not exist`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
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

import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import _ from "lodash";

export default function makeGetUserController({
  getUser,
}: {
  getUser: IGetUser;
}) {
  return async function getUserController(
    httpRequest: Request & { context: { validated: { user_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getUser({ _id });
      if (!exists) {
        throw new Error(`User ${_id} does not exist`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (err) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500,
        body: {
          error: err.message,
        },
      };
    }
  };
}

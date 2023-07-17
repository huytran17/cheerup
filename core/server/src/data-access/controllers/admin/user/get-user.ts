import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { get, merge, omit } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

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
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getUser({ _id });
      if (isEmpty(exists)) {
        throw new Error(`User ${_id} does not exist`);
      }

      const final_user_data = merge({}, omit(exists, ["tfa_secret"]));

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_user_data,
        },
      };
    } catch (error) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          error: error.message,
        },
      };
    }
  };
}

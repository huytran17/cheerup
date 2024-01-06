import { Request } from "express";
import { GetUser } from "../../../../use-cases/user/get-user";
import { get, merge, omit } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetUserController({
  getUser,
}: {
  getUser: GetUser;
}) {
  return async function getUserController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { user_id }: { user_id: string } = get(
        httpRequest,
        "context.validated"
      );

      const exists = await getUser({ _id: user_id });

      if (isEmpty(exists)) {
        throw new Error(`User by ${user_id} does not exist`);
      }

      const final_user_data = merge(
        {},
        omit(exists, ["tfa_secret", "hash_password"])
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_user_data,
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

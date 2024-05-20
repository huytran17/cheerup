import { Request } from "express";
import { GetUser, IGetUserPayload } from "../../../../use-cases/user/get-user";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import IUser from "../../../../database/interfaces/user";

export default function makeGetUserController({
  getUser,
}: {
  getUser: GetUser;
}) {
  return async function getUserController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = <IUser>get(httpRequest, "context.user", {});

      const { _id } = <IGetUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      if (user_id !== _id) {
        throw new Error("Access denied");
      }

      const exists = await getUser({ _id });

      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
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

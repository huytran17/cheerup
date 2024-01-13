import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";

export default function makeSignOutController() {
  return async function signOutController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      //TODO: remove auth cookie
      const exists = <IUser>get(httpRequest, "context.user", {});

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: {
            valid_signout: true,
          },
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
          valid_signout: false,
        },
      };
    }
  };
}

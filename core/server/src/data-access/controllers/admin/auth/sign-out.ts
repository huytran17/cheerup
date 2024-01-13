import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import IAdmin from "../../../../database/interfaces/admin";

export default function makeSignOutController() {
  return async function signOutController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      //TODO: remove cookies
      const exists = <IAdmin>get(httpRequest, "context.user", {});

      if (isEmpty(exists)) {
        throw new Error(`Admin does not exist`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: {
            signed_out: true,
          },
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

import { Request } from "express";
import { get, omit } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";

export default function makeGetMeController() {
  return async function getMeController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = <IAdmin>get(httpRequest, "context.user", {});

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: omit(exists, "hash_password"),
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

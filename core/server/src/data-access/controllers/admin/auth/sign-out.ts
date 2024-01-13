import { Request } from "express";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeSignOutController() {
  return async function signOutController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: {
            sign_out: true,
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

import { ICreatePasswordReset } from "../../../../use-cases/password-reset/create-password-reset";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeCreatePasswordResetController({
  createPasswordReset,
}: {
  createPasswordReset: ICreatePasswordReset;
}) {
  return async function createPasswordResetController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const passwordResetDetails = get(httpRequest, "context.validated");

      const created_password_reset = await createPasswordReset({
        passwordResetDetails,
      });

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_password_reset,
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

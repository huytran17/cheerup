import { Request } from "express";
import { IGetByEmailAndCode } from "../../../../use-cases/password-reset/get-by-email-and-code";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetPasswordResetByEmailAndCodeController({
  getByEmailAndCode,
}: {
  getByEmailAndCode: IGetByEmailAndCode;
}) {
  return async function getPasswordResetByEmailAndCodeController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email, security_code } = get(httpRequest, "context.validated");

      const exists = await getByEmailAndCode({
        email,
        security_code,
      });

      if (isEmpty(exists)) {
        throw new Error(
          `Password reset by email ${email} & code ${security_code} does not exists`
        );
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

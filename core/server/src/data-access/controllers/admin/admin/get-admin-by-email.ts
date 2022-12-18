import { Request } from "express";
import { IGetAdminByEmail } from "../../../../use-cases/admin/get-admin-by-email";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetAdminByEmailController({
  getAdminByEmail,
}: {
  getAdminByEmail: IGetAdminByEmail;
}) {
  return async function getAdminByEmailController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = _.get(httpRequest, "context.validated");
      const exists = await getAdminByEmail({ email });
      if (!exists) {
        throw new Error(`Admin ${email} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

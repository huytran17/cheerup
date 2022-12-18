import { Request } from "express";
import { IGetAdminByEmail } from "../../../../use-cases/admin/get-admin-by-email";
import _ from "lodash";

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
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}

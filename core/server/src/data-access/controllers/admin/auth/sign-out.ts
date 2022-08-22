import { IGetAdminByEmail } from "../../../../use-cases/admin/get-admin-by-email";
import { Request } from "express";
import _ from "lodash";
import { Logger } from "winston";

export default function makeSignOutController({
  getAdminByEmail,
}: {
  getAdminByEmail: IGetAdminByEmail;
}) {
  return async function signOutController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = _.get(httpRequest, "context.user");
      const exists = await getAdminByEmail({ email });
      if (!exists) {
        throw new Error(`Admin by ${email} does not exist`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: {
            signed_out: true,
          },
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}

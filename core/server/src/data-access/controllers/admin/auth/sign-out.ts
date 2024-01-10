import {
  GetAdminByEmail,
  IGetAdminByEmailPayload,
} from "../../../../use-cases/admin/get-admin-by-email";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeSignOutController({
  getAdminByEmail,
}: {
  getAdminByEmail: GetAdminByEmail;
}) {
  return async function signOutController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = <IGetAdminByEmailPayload>(
        get(httpRequest, "context.user", {})
      );

      const exists = await getAdminByEmail({ email });
      if (isEmpty(exists)) {
        throw new Error(`Admin by ${email} does not exist`);
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

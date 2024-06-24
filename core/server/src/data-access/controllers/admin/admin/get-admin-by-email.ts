import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetAdminByEmail,
  IGetAdminByEmailPayload,
} from "../../../../use-cases/admin/get-admin-by-email";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetAdminByEmailController({
  getAdminByEmail,
}: {
  getAdminByEmail: GetAdminByEmail;
}) {
  return async function getAdminByEmailController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = <IGetAdminByEmailPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getAdminByEmail({ email });
      if (isEmpty(exists)) {
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

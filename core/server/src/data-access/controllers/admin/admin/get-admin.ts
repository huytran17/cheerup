import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetAdmin,
  IGetAdminPayload,
} from "../../../../use-cases/admin/get-admin";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetAdminController({
  getAdmin,
}: {
  getAdmin: GetAdmin;
}) {
  return async function getAdminController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetAdminPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getAdmin({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Admin ${_id} does not exist`);
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

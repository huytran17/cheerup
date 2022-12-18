import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IDeleteAdmin } from "../../../../use-cases/admin/delete-admin";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeDeleteAdminController({
  getAdmin,
  deleteAdmin,
  logger,
}: {
  getAdmin: IGetAdmin;
  deleteAdmin: IDeleteAdmin;
  logger: Logger;
}) {
  return async function deleteAdminController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getAdmin({ _id });
      if (!exists) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const deleted_admin = await deleteAdmin({ _id });
      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted_admin,
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

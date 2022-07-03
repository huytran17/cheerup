import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IDeleteAdmin } from "../../../../use-cases/admin/delete-admin";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteAdmin({
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
      const adminDetails = _.get(httpRequest, "context.validated");
      const { _id } = adminDetails;
      const exists = await getAdmin({ _id });
      if (!exists) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const deleted_admin = await deleteAdmin({ _id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted_admin,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

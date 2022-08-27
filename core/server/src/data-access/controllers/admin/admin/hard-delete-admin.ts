import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IHardDeleteAdmin } from "../../../../use-cases/admin/hard-delete-admin";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeHardDeleteAdminController({
  getAdmin,
  hardDeleteAdmin,
  logger,
}: {
  getAdmin: IGetAdmin;
  hardDeleteAdmin: IHardDeleteAdmin;
  logger: Logger;
}) {
  return async function hardDeleteAdminController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } =  _.get(httpRequest, "context.validated");
      const exists = await getAdmin({ _id });
      if (!exists) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const deleted_admin = await hardDeleteAdmin({ _id });
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
import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IUpdateAdmin } from "../../../../use-cases/admin/update-admin";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeRestoreAdminController({
  getAdmin,
  updateAdmin,
  logger,
}: {
  getAdmin: IGetAdmin;
  updateAdmin: IUpdateAdmin;
  logger: Logger;
}) {
  return async function restoreAdminController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getAdmin({ _id });
      if (!exists) {
        throw new Error(`Admin by id ${_id} does not exist`);
      }

      const updated_admin_data = Object.assign({}, exists, {
        deleted_at: null,
      });

      const updated_admin = await updateAdmin({
        adminDetails: updated_admin_data,
      });

      logger.verbose(`Restored admin ${_id} successfully`);

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_admin,
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

import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IUpdateAdmin } from "../../../../use-cases/admin/update-admin";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

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
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getAdmin({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Admin by id ${_id} does not exist`);
      }

      const updated_admin_data = merge({}, exists, {
        deleted_at: null,
      });

      const updated_admin = await updateAdmin({
        adminDetails: updated_admin_data,
      });

      logger.verbose(`Restored admin ${exists.email} successfully`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_admin,
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

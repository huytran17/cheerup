import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IUpdateAdmin } from "../../../../use-cases/admin/update-admin";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeUpdateAdminController({
  getAdmin,
  updateAdmin,
  logger,
}: {
  getAdmin: IGetAdmin;
  updateAdmin: IUpdateAdmin;
  logger: Logger;
}) {
  return async function updateAdminController(
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

      const updated_admin = await updateAdmin({ adminDetails });
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

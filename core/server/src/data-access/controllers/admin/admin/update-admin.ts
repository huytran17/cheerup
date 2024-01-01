import { GetAdmin } from "../../../../use-cases/admin/get-admin";
import { UpdateAdmin } from "../../../../use-cases/admin/update-admin";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdateAdminController({
  getAdmin,
  updateAdmin,
  logger,
}: {
  getAdmin: GetAdmin;
  updateAdmin: UpdateAdmin;
  logger: Logger;
}) {
  return async function updateAdminController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const adminDetails = get(httpRequest, "context.validated");
      const { _id }: { _id: string } = adminDetails;

      const exists = await getAdmin({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const final_admin_details = merge({}, exists, adminDetails);
      const updated_admin = await updateAdmin({
        adminDetails: final_admin_details,
      });

      logger.verbose(`Updated admin ${exists.email}`);

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

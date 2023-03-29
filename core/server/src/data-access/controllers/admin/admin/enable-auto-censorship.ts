import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IUpdateAdmin } from "../../../../use-cases/admin/update-admin";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeEnableAutoCensorshipController({
  getAdmin,
  updateAdmin,
  logger,
}: {
  getAdmin: IGetAdmin;
  updateAdmin: IUpdateAdmin;
  logger: Logger;
}) {
  return async function enableAutoCensorshipController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = get(httpRequest, "context.validated");

      const exists = await getAdmin({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const final_admin_details = Object.assign({}, exists, {
        is_auto_censorship_post: true,
      });

      const updated_admin = await updateAdmin({
        adminDetails: final_admin_details,
      });

      logger.verbose(
        `Enabled auto censorship for admin: ${updated_admin.email}`
      );

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

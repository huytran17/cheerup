import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetAdmin } from "../../../../use-cases/admin/get-admin";
import {
  IUpdateAdminPayload,
  UpdateAdmin,
} from "../../../../use-cases/admin/update-admin";
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
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const admin_details = <IUpdateAdminPayload>(
        get(httpRequest, "context.validated", {})
      );
      const { _id } = admin_details;

      const exists = await getAdmin({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const updated_admin = await updateAdmin({
        ...exists,
        ...admin_details,
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

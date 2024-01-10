import { GetAdmin } from "../../../../use-cases/admin/get-admin";
import {
  HardDeleteAdmin,
  IHardDeleteAdminPayload,
} from "../../../../use-cases/admin/hard-delete-admin";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeHardDeleteAdminController({
  getAdmin,
  hardDeleteAdmin,
  logger,
}: {
  getAdmin: GetAdmin;
  hardDeleteAdmin: HardDeleteAdmin;
  logger: Logger;
}) {
  return async function hardDeleteAdminController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IHardDeleteAdminPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getAdmin({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const deleted_admin = await hardDeleteAdmin({ _id });

      logger.verbose(`Hard deleted admin: ${exists.email}`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted_admin,
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

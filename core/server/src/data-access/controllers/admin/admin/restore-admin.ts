import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetSoftDeletedAdmin,
  IGetSoftDeletedAdminPayload,
} from "../../../../use-cases/admin/get-soft-deleted-admin";
import { UpdateAdmin } from "../../../../use-cases/admin/update-admin";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeRestoreAdminController({
  getSoftDeletedAdmin,
  updateAdmin,
  logger,
}: {
  getSoftDeletedAdmin: GetSoftDeletedAdmin;
  updateAdmin: UpdateAdmin;
  logger: Logger;
}) {
  return async function restoreAdminController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetSoftDeletedAdminPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getSoftDeletedAdmin({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Admin by id ${_id} does not exist`);
      }

      const updated_admin = await updateAdmin({
        ...exists,
        deleted_at: null,
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

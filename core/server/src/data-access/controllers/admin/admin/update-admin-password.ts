import { GetAdmin } from "../../../../use-cases/admin/get-admin";
import {
  IUpdateAdminPayload,
  UpdateAdmin,
} from "../../../../use-cases/admin/update-admin";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HashPassword } from "../../../../config/password/hash-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdateAdminPasswordController({
  getAdmin,
  updateAdmin,
  hashPassword,
  logger,
}: {
  getAdmin: GetAdmin;
  updateAdmin: UpdateAdmin;
  hashPassword: HashPassword;
  logger: Logger;
}) {
  return async function updateAdminPasswordController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id, password, password_confirmation } = <IUpdateAdminPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getAdmin({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const hashed_password = await hashPassword({
        password,
        password_confirmation,
      });

      const admin_details = merge({}, exists, {
        hash_password: hashed_password,
      });

      const updated_admin = await updateAdmin({
        adminDetails: admin_details,
      });

      logger.verbose(`Updated password for admin ${exists.email}`);

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

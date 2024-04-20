import { GetAdmin } from "../../../../use-cases/admin/get-admin";
import {
  IUpdateAdminPayload,
  UpdateAdmin,
} from "../../../../use-cases/admin/update-admin";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HashPassword } from "../../../../config/password/hash-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import { ResetLoginFailedTimes } from "../../../../use-cases/admin/reset-login-failed-times";

export default function makeUpdateAdminPasswordController({
  getAdmin,
  updateAdmin,
  hashPassword,
  resetLoginFailedTimes,
  logger,
}: {
  getAdmin: GetAdmin;
  updateAdmin: UpdateAdmin;
  hashPassword: HashPassword;
  resetLoginFailedTimes: ResetLoginFailedTimes;
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

      const admin_details = {
        ...exists,
        hash_password: hashed_password,
      };

      const updated_admin = await updateAdmin(admin_details);

      logger.verbose(`Updated password for admin ${exists.email}`);

      await resetLoginFailedTimes({ _id: exists._id });

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

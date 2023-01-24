import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IUpdateAdmin } from "../../../../use-cases/admin/update-admin";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { IHashPassword } from "../../../../config/password/hash-password";
import { IVerifyPassword } from "../../../../config/password/verify-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeUpdateAdminPersonalPasswordController({
  getAdmin,
  updateAdmin,
  hashPassword,
  verifyPassword,
  logger,
}: {
  getAdmin: IGetAdmin;
  updateAdmin: IUpdateAdmin;
  hashPassword: IHashPassword;
  verifyPassword: IVerifyPassword;
  logger: Logger;
}) {
  return async function updateAdminPersonalPasswordController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id, password, new_password, new_password_confirmation } = _.get(
        httpRequest,
        "context.validated"
      );
      const exists = await getAdmin({ _id });
      if (!exists) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const valid_password = await verifyPassword({
        password,
        hash_password: exists.hash_password,
      });

      if (!valid_password) {
        throw new Error(`Password is incorrect`);
      }

      const hashed_password = await hashPassword({
        password: new_password,
        password_confirmation: new_password_confirmation,
      });

      const admin_details = Object.assign({}, exists, {
        hash_password: hashed_password,
      });

      const updated_admin = await updateAdmin({
        adminDetails: admin_details,
      });

      logger.verbose(`Updated password for admin ${_id}`);

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

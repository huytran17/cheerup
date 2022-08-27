import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { IUpdateAdmin } from "../../../../use-cases/admin/update-admin";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { IHashPassword } from "../../../../config/password/hash-password";

export default function makeUpdateAdminPasswordController({
  getAdmin,
  updateAdmin,
  hashPassword,
  logger,
}: {
  getAdmin: IGetAdmin;
  updateAdmin: IUpdateAdmin;
  hashPassword: IHashPassword;
  logger: Logger;
}) {
  return async function updateAdminPasswordController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id, password, password_confirmation } = _.get(
        httpRequest,
        "context.validated"
      );
      const exists = await getAdmin({ _id });
      if (!exists) {
        throw new Error(`Admin by ${_id} does not exist`);
      }

      const hashed_password = await hashPassword({
        password,
        password_confirmation,
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

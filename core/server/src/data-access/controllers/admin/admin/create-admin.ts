import { Request } from "express";
import { Logger } from "winston";
import { get, merge } from "lodash";
import { CreateAdmin } from "../../../../use-cases/admin/create-admin";
import { GetAdminByEmail } from "../../../../use-cases/admin/get-admin-by-email";
import { HashPassword } from "../../../../config/password/hash-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateAdminController({
  createAdmin,
  getAdminByEmail,
  hashPassword,
  logger,
}: {
  createAdmin: CreateAdmin;
  getAdminByEmail: GetAdminByEmail;
  hashPassword: HashPassword;
  logger: Logger;
}) {
  return async function createAdminController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const admin = get(httpRequest, "context.validated");

      const {
        email,
        password,
        password_confirmation,
      }: { email: string; password: string; password_confirmation: string } =
        admin;

      const exists = await getAdminByEmail({ email });
      if (!isEmpty(exists)) {
        throw new Error(`Admin by ${email} already exists`);
      }

      const hashed_password = await hashPassword({
        password,
        password_confirmation,
      });

      const admin_details = merge({}, admin, {
        hash_password: hashed_password,
      });

      const created_admin = await createAdmin({
        adminDetails: admin_details,
      });

      logger.verbose(`Created admin: ${created_admin.email}`);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_admin,
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

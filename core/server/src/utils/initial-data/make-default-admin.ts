import { AdminType } from "../../database/interfaces/admin";
import { Logger } from "winston";
import { HashPassword } from "../../config/password/hash-password";
import { CreateAdmin } from "../../use-cases/admin/create-admin";
import { GetOneAdmin } from "../../use-cases/admin/get-one-admin";
import _ from "lodash";
import { isEmpty } from "../../utils/is-empty";

export type DefaultAdmin = () => Promise<void>;

export default function makeCreateDefaultAdmin({
  getOneAdmin,
  hashPassword,
  createAdmin,
  logger,
}: {
  getOneAdmin: GetOneAdmin;
  hashPassword: HashPassword;
  createAdmin: CreateAdmin;
  logger: Logger;
}): DefaultAdmin {
  return async function createDefaultAdmin() {
    const admin = await getOneAdmin();

    if (!isEmpty(admin)) {
      return;
    }

    const hash_password = await hashPassword({
      password: process.env.DEFAULT_ADMIN_PASSWORD,
      password_confirmation: process.env.DEFAULT_ADMIN_PASSWORD,
    });

    const admin_details = {
      full_name: process.env.DEFAULT_ADMIN_FULLNAME || "Huy Tran",
      email: process.env.DEFAULT_ADMIN_EMAIL || "huytran.13022k@gmail.com",
      type: AdminType.Owner,
      hash_password,
    };

    await createAdmin(admin_details);

    logger.verbose(`Created default admin: ${admin_details.email}`);
  };
}

import { AdminType } from "../../database/interfaces/admin";
import IAdmin from "../../database/interfaces/admin";
import { Logger } from "winston";
import { IHashPassword } from "../../config/password/hash-password";
import { ICreateAdmin } from "../../use-cases/admin/create-admin";
import { IGetOneAdmin } from "../../use-cases/admin/get-one-admin";
import _ from "lodash";
import { isEmpty } from "../../utils/is-empty";

export type IDefaultAdmin = () => Promise<IAdmin | null>;

export default function makeCreateDefaultAdmin({
  getOneAdmin,
  hashPassword,
  createAdmin,
  logger,
}: {
  getOneAdmin: IGetOneAdmin;
  hashPassword: IHashPassword;
  createAdmin: ICreateAdmin;
  logger: Logger;
}): IDefaultAdmin {
  return async function createDefaultAdmin(): Promise<IAdmin | null> {
    const hash_password = await hashPassword({
      password: process.env.DEFAULT_ADMIN_PASSWORD,
      password_confirmation: process.env.DEFAULT_ADMIN_PASSWORD,
    });

    const adminDetails = {
      full_name: process.env.DEFAULT_ADMIN_FULLNAME || "Huy Tran",
      email: process.env.DEFAULT_ADMIN_EMAIL || "huytran.13022k@gmail.com",
      type: AdminType.Owner,
      hash_password,
    };

    const admin = await getOneAdmin();

    if (!isEmpty(admin)) {
      return;
    }

    const created_admin = await createAdmin({
      adminDetails,
    });

    logger.verbose(`Created default admin: ${created_admin.email}`);
  };
}

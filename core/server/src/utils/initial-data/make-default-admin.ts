import { AdminType } from "../../database/interfaces/admin";
import IAdmin from "../../database/interfaces/admin";
import { Logger } from "winston";
import { IHashPassword } from "../../config/password/hash-password";
import { ICreateAdmin } from "../../use-cases/admin/create-admin";
import { IGetOneAdmin } from "../../use-cases/admin/get-one-admin";
import _ from "lodash";

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
      email: process.env.DEFAULT_ADMIN_EMAIL,
      type: AdminType.Super,
      hash_password,
    };

    const admin = await getOneAdmin();

    const admin_not_exists = _.isEmpty(admin) || _.isNil(admin);

    if (admin_not_exists) {
      const created_admin = await createAdmin({
        adminDetails,
      });

      logger.verbose(`Created default admin: ${created_admin.email}`);
    }

    return null;
  };
}

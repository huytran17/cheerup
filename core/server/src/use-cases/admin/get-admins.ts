import { Logger } from "winston";
import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IGetAdmins = () => Promise<Admin[] | null>;

export default function makeGetAdmins({
  adminDb,
  logger,
}: {
  adminDb: IAdminDb;
  logger: Logger;
}): IGetAdmins {
  return async function getAdmins(): Promise<Admin[] | null> {
    const admins = await adminDb.findAll();
    return admins;
  };
}

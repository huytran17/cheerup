import { Logger } from "winston";
import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IGetAdmins = () => Promise<Admin[]>;

export default function makeGetAdmins({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IGetAdmins {
  return async function getAdmins() {
    return await adminDb.findAll();
  };
}

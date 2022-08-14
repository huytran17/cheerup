import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";
import { Logger } from "winston";

export type IGetAdmin = ({ _id }: { _id: string }) => Promise<Admin | null>;

export default function makeGetAdmin({
  adminDb,
  logger,
}: {
  adminDb: IAdminDb;
  logger: Logger;
}): IGetAdmin {
  return async function getAdmin({
    _id,
  }: {
    _id: string;
  }): Promise<Admin | null> {
    const admin = await adminDb.findById({ _id });
    return admin;
  };
}

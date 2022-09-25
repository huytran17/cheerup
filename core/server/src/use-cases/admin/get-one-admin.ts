import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IGetOneAdmin = () => Promise<Admin | null>;

export default function makeGetOneAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IGetOneAdmin {
  return async function getOneAdmin(): Promise<Admin | null> {
    const admin = await adminDb.findOne();
    return admin;
  };
}

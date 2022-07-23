import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IUpdateAdminData {
  adminDetails: Omit<IAdmin, "_id">;
}

export type IUpdateAdmin = ({
  adminDetails,
}: IUpdateAdminData) => Promise<Admin | null>;

export default function makeUpdateAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IUpdateAdmin {
  return async function updateAdmin({
    adminDetails,
  }: IUpdateAdminData): Promise<Admin | null> {
    const admin = await adminDb.update(adminDetails);
    return admin;
  };
}

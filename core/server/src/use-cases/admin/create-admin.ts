import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface ICreateAdminData {
  adminDetails: Omit<
    IAdmin,
    "_id" | "created_at" | "updated_at" | "deleted_at"
  >;
}

export type ICreateAdmin = ({
  adminDetails,
}: ICreateAdminData) => Promise<Admin | null>;

export default function makeCreateAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): ICreateAdmin {
  return async function createAdmin({
    adminDetails,
  }: ICreateAdminData): Promise<Admin | null> {
    const admin = await adminDb.insert(adminDetails);
    return admin;
  };
}

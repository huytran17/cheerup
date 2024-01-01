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
}: ICreateAdminData) => Promise<IAdmin>;

export default function makeCreateAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): ICreateAdmin {
  return async function createAdmin({ adminDetails }) {
    return await adminDb.insert(adminDetails);
  };
}

import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IUpdateAdminData {
  adminDetails: Omit<IAdmin, "_id">;
}

export type IUpdateAdmin = ({
  adminDetails,
}: IUpdateAdminData) => Promise<IAdmin>;

export default function makeUpdateAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IUpdateAdmin {
  return async function updateAdmin({ adminDetails }) {
    return await adminDb.update(adminDetails);
  };
}

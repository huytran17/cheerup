import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IUpdateAdminData {
  adminDetails: Omit<IAdmin, "_id">;
}

export type UpdateAdmin = ({
  adminDetails,
}: IUpdateAdminData) => Promise<IAdmin>;

export default function makeUpdateAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): UpdateAdmin {
  return async function updateAdmin({ adminDetails }) {
    return await adminDb.update(adminDetails);
  };
}

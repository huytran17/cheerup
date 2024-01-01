import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export type IGetAdmins = () => Promise<IAdmin[]>;

export default function makeGetAdmins({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IGetAdmins {
  return async function getAdmins() {
    return await adminDb.findAll();
  };
}

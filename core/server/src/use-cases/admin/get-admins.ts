import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export type GetAdmins = () => Promise<IAdmin[]>;

export default function makeGetAdmins({
  adminDb,
}: {
  adminDb: IAdminDb;
}): GetAdmins {
  return async function getAdmins() {
    return await adminDb.findAll();
  };
}

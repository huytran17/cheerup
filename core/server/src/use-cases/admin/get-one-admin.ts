import IAdmin from "../../database/interfaces/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IGetOneAdmin = () => Promise<IAdmin>;

export default function makeGetOneAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IGetOneAdmin {
  return async function getOneAdmin() {
    return await adminDb.findOne();
  };
}

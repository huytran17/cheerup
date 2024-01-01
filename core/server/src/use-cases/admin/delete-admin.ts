import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export type IDeleteAdmin = ({ _id }: { _id: string }) => Promise<IAdmin>;

export default function makeDeleteAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IDeleteAdmin {
  return async function deleteAdmin({ _id }) {
    return await adminDb.delete({ _id });
  };
}

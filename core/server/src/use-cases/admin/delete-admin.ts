import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export type DeleteAdmin = ({ _id }: { _id: string }) => Promise<IAdmin>;

export default function makeDeleteAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): DeleteAdmin {
  return async function deleteAdmin({ _id }) {
    return await adminDb.delete({ _id });
  };
}

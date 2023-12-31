import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IHardDeleteAdmin = ({ _id }: { _id: string }) => Promise<Admin>;

export default function makeHardDeleteAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IHardDeleteAdmin {
  return async function hardDeleteAdmin({ _id }) {
    return await adminDb.hardDelete({ _id });
  };
}

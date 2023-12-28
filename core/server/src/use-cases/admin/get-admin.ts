import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IGetAdmin = ({ _id }: { _id: string }) => Promise<Admin | null>;

export default function makeGetAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IGetAdmin {
  return async function getAdmin({ _id }) {
    return await adminDb.findById({ _id });
  };
}

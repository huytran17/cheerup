import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IDeleteAdmin = ({ _id }: { _id: string }) => Promise<Admin | null>;

export default function makeDeleteAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IDeleteAdmin {
  return async function deleteAdmin({
    _id,
  }: {
    _id: string;
  }): Promise<Admin | null> {
    const admin = await adminDb.delete({ _id });
    return admin;
  };
}

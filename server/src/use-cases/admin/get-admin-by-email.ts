import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IGetAdminByEmail = ({
  email,
}: {
  email: string;
}) => Promise<Admin | null>;

export default function makeGetAdminByEmail({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IGetAdminByEmail {
  return async function getAdminByEmail({
    email,
  }: {
    email: string;
  }): Promise<Admin | null> {
    const admin = await adminDb.findByEmail({ email });
    return admin;
  };
}

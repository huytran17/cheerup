import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export type IGetAdminByEmail = ({
  email,
}: {
  email: string;
}) => Promise<IAdmin>;

export default function makeGetAdminByEmail({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IGetAdminByEmail {
  return async function getAdminByEmail({ email }) {
    return await adminDb.findByEmail({ email });
  };
}

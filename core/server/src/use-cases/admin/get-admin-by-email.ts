import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IGetAdminByEmailPayload {
  email: string;
}

export type GetAdminByEmail = ({
  email,
}: IGetAdminByEmailPayload) => Promise<IAdmin>;

export default function makeGetAdminByEmail({
  adminDb,
}: {
  adminDb: IAdminDb;
}): GetAdminByEmail {
  return async function getAdminByEmail({ email }) {
    return await adminDb.findByEmail({ email });
  };
}

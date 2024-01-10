import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface ICreateAdminPayload extends Partial<IAdmin> {
  [key: string]: any;
}

interface ICreateAdmin {
  adminDetails: ICreateAdminPayload;
}

export type CreateAdmin = ({ adminDetails }: ICreateAdmin) => Promise<IAdmin>;

export default function makeCreateAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): CreateAdmin {
  return async function createAdmin({ adminDetails }) {
    return await adminDb.insert(adminDetails);
  };
}

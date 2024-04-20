import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface ICreateAdminPayload extends Partial<IAdmin> {
  [key: string]: any;
}

export type CreateAdmin = (payload: ICreateAdminPayload) => Promise<IAdmin>;

export default function makeCreateAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): CreateAdmin {
  return async function createAdmin(payload) {
    return await adminDb.insert(payload);
  };
}

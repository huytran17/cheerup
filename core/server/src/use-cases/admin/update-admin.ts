import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IUpdateAdminPayload extends Partial<IAdmin> {
  [key: string]: any;
}

export type UpdateAdmin = (payload: IUpdateAdminPayload) => Promise<IAdmin>;

export default function makeUpdateAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): UpdateAdmin {
  return async function updateAdmin(payload) {
    return await adminDb.update(payload);
  };
}

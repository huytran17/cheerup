import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IBatchUploadAdmins extends Partial<IAdmin> {
  [key: string]: any;
}

export type BatchUploadAdmins = (
  payload: IBatchUploadAdmins[]
) => Promise<IAdmin[]>;

export default function makeBatchUploadAdmins({
  adminDb,
}: {
  adminDb: IAdminDb;
}): BatchUploadAdmins {
  return async function batchUploadAdmins(payload) {
    return await adminDb.insertMany(payload);
  };
}

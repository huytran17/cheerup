import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IGetSoftDeletedAdminPayload {
  _id: string;
}

export type GetSoftDeletedAdmin = ({
  _id,
}: IGetSoftDeletedAdminPayload) => Promise<IAdmin>;

export default function makeGetSoftDeletedAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): GetSoftDeletedAdmin {
  return async function getSoftDeletedAdmin({ _id }) {
    return await adminDb.findSoftDeletedById({ _id });
  };
}

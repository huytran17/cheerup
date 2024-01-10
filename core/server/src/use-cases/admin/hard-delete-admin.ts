import IAdmin from "../../database/interfaces/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export interface IHardDeleteAdminPayload {
  _id: string;
}

export type HardDeleteAdmin = ({
  _id,
}: IHardDeleteAdminPayload) => Promise<IAdmin>;

export default function makeHardDeleteAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): HardDeleteAdmin {
  return async function hardDeleteAdmin({ _id }) {
    return await adminDb.hardDelete({ _id });
  };
}

import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IGetAdminPayload {
  _id: string;
}

export type GetAdmin = ({ _id }: IGetAdminPayload) => Promise<IAdmin>;

export default function makeGetAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): GetAdmin {
  return async function getAdmin({ _id }) {
    return await adminDb.findById({ _id });
  };
}

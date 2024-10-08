import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IResetLoginFailedTimes {
  _id: string;
}

export type ResetLoginFailedTimes = ({
  _id,
}: IResetLoginFailedTimes) => Promise<IAdmin>;

export default function makeResetLoginFailedTimes({
  adminDb,
}: {
  adminDb: IAdminDb;
}): ResetLoginFailedTimes {
  return async function resetLoginFailedTimes({ _id }) {
    return await adminDb.resetLoginFailedTimes({ _id });
  };
}

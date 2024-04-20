import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IResetLoginFailedTimesPayload {
  _id: string;
}

export type ResetLoginFailedTimes = ({
  _id,
}: IResetLoginFailedTimesPayload) => Promise<IAdmin>;

export default function makeResetLoginFailedTimes({
  adminDb,
}: {
  adminDb: IAdminDb;
}): ResetLoginFailedTimes {
  return async function resetLoginFailedTimes({ _id }) {
    return await adminDb.resetLoginFailedTimes({ _id });
  };
}

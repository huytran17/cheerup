import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IIncreaseLoginFailedTimesPayload {
  _id: string;
}

export type IncreaseLoginFailedTimes = ({
  _id,
}: IIncreaseLoginFailedTimesPayload) => Promise<IAdmin>;

export default function makeIncreaseLoginFailedTimes({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IncreaseLoginFailedTimes {
  return async function increaseLoginFailedTimes({ _id }) {
    return await adminDb.increaseLoginFailedTimes({ _id });
  };
}

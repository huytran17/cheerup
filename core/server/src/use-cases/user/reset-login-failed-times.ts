import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export interface IResetLoginFailedTimesPayload {
  _id: string;
}

export type ResetLoginFailedTimes = ({
  _id,
}: IResetLoginFailedTimesPayload) => Promise<IUser>;

export default function makeResetLoginFailedTimes({
  userDb,
}: {
  userDb: IUserDb;
}): ResetLoginFailedTimes {
  return async function resetLoginFailedTimes({ _id }) {
    return userDb.resetLoginFailedTimes({ _id });
  };
}

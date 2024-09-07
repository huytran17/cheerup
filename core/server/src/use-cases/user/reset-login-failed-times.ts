import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export interface IResetLoginFailedTimes {
  _id: string;
}

export type ResetLoginFailedTimes = ({
  _id,
}: IResetLoginFailedTimes) => Promise<IUser>;

export default function makeResetLoginFailedTimes({
  userDb,
}: {
  userDb: IUserDb;
}): ResetLoginFailedTimes {
  return async function resetLoginFailedTimes({ _id }) {
    return userDb.resetLoginFailedTimes({ _id });
  };
}

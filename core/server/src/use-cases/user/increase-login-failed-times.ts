import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export interface IIncreaseLoginFailedTimes {
  _id: string;
}

export type IncreaseLoginFailedTimes = ({
  _id,
}: IIncreaseLoginFailedTimes) => Promise<IUser>;

export default function makeIncreaseLoginFailedTimes({
  userDb,
}: {
  userDb: IUserDb;
}): IncreaseLoginFailedTimes {
  return async function increaseLoginFailedTimes({ _id }) {
    return userDb.increaseLoginFailedTimes({ _id });
  };
}

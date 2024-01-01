import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IRestoreUser = ({ _id }: { _id: string }) => Promise<IUser>;

export default function makeRestoreUser({
  userDb,
}: {
  userDb: IUserDb;
}): IRestoreUser {
  return async function restoreUser({ _id }) {
    return await userDb.restore({ _id });
  };
}

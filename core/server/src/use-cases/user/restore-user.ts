import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type RestoreUser = ({ _id }: { _id: string }) => Promise<IUser>;

export default function makeRestoreUser({
  userDb,
}: {
  userDb: IUserDb;
}): RestoreUser {
  return async function restoreUser({ _id }) {
    return await userDb.restore({ _id });
  };
}

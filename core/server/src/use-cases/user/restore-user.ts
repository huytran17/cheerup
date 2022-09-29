import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IRestoreUser = ({ _id }: { _id: string }) => Promise<User | null>;

export default function makeRestoreUser({
  userDb,
}: {
  userDb: IUserDb;
}): IRestoreUser {
  return async function restoreUser({
    _id,
  }: {
    _id: string;
  }): Promise<User | null> {
    const user = await userDb.restore({ _id });
    return user;
  };
}
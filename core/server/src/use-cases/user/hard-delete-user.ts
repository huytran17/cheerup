import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IHardDeleteUser = ({ _id }: { _id: string }) => Promise<IUser>;

export default function makeHardDeleteUser({
  userDb,
}: {
  userDb: IUserDb;
}): IHardDeleteUser {
  return async function hardDeleteUser({ _id }) {
    return await userDb.hardDelete({ _id });
  };
}

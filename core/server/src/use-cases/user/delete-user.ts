import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IDeleteUser = ({ _id }: { _id: string }) => Promise<User>;

export default function makeDeleteUser({
  userDb,
}: {
  userDb: IUserDb;
}): IDeleteUser {
  return async function deleteUser({ _id }) {
    return await userDb.delete({ _id });
  };
}

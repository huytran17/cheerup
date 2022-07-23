import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IDeleteUser = ({ _id }: { _id: string }) => Promise<User | null>;

export default function makeDeleteUser({
  userDb,
}: {
  userDb: IUserDb;
}): IDeleteUser {
  return async function deleteUser({
    _id,
  }: {
    _id: string;
  }): Promise<User | null> {
    const user = await userDb.delete({ _id });
    return user;
  };
}

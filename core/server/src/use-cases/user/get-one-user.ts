import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetOneUser = () => Promise<User | null>;

export default function makeGetOneUser({
  userDb,
}: {
  userDb: IUserDb;
}): IGetOneUser {
  return async function getOneUser(): Promise<User | null> {
    const user = await userDb.findOne();
    return user;
  };
}

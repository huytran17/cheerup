import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetOneUser = () => Promise<User>;

export default function makeGetOneUser({
  userDb,
}: {
  userDb: IUserDb;
}): IGetOneUser {
  return async function getOneUser() {
    return await userDb.findOne();
  };
}

import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type GetOneUser = () => Promise<IUser>;

export default function makeGetOneUser({
  userDb,
}: {
  userDb: IUserDb;
}): GetOneUser {
  return async function getOneUser() {
    return await userDb.findOne();
  };
}

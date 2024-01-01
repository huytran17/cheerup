import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type GetUsers = () => Promise<IUser[]>;

export default function makeGetUsers({
  userDb,
}: {
  userDb: IUserDb;
}): GetUsers {
  return async function getUsers() {
    return await userDb.findAll();
  };
}

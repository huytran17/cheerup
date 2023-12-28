import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUsers = () => Promise<User[] | null>;

export default function makeGetUsers({
  userDb,
}: {
  userDb: IUserDb;
}): IGetUsers {
  return async function getUsers() {
    return await userDb.findAll();
  };
}

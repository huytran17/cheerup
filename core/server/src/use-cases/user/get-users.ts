import { Logger } from "winston";
import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUsers = () => Promise<User[] | null>;

export default function makeGetUsers({
  userDb,
  logger,
}: {
  userDb: IUserDb;
  logger: Logger;
}): IGetUsers {
  return async function getUsers(): Promise<User[] | null> {
    const users = await userDb.findAll();
    return users;
  };
}

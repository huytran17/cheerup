import { Logger } from "winston";
import Redis from "../../config/storage/redis";
import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUsers = () => Promise<User[] | null>;

export default function makeGetUsers({
  userDb,
  redis,
  logger,
}: {
  userDb: IUserDb;
  redis: Redis;
  logger: Logger;
}): IGetUsers {
  return async function getUsers(): Promise<User[] | null> {
    const users = await userDb.findAll();
    return users;
  };
}

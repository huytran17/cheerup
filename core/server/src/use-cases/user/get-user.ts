import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";
import { Logger } from "winston";

export type IGetUser = ({ _id }: { _id: string }) => Promise<User | null>;

export default function makeGetUser({
  userDb,
  logger,
}: {
  userDb: IUserDb;
  logger: Logger;
}): IGetUser {
  return async function getUser({
    _id,
  }: {
    _id: string;
  }): Promise<User | null> {
    const user = await userDb.findById({ _id });
    return user;
  };
}

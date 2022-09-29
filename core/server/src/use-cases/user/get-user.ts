import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";
import { Logger } from "winston";

export type IGetUser = ({
  _id,
  is_include_deleted,
}: {
  _id: string;
  is_include_deleted?: boolean;
}) => Promise<User | null>;

export default function makeGetUser({
  userDb,
  logger,
}: {
  userDb: IUserDb;
  logger: Logger;
}): IGetUser {
  return async function getUser({
    _id,
    is_include_deleted,
  }: {
    _id: string;
    is_include_deleted?: boolean;
  }): Promise<User | null> {
    const user = await userDb.findById({ _id, is_include_deleted });
    return user;
  };
}

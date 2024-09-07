import IUser from "../../database/interfaces/user";
import UserDb from "../../data-access/interfaces/user-db";

export interface ICreateUser extends Partial<IUser> {
  [key: string]: any;
}

export type CreateUser = (payload: ICreateUser) => Promise<IUser>;

export default function makeCreateUser({
  userDb,
}: {
  userDb: UserDb;
}): CreateUser {
  return async function createUser(payload) {
    return await userDb.insert(payload);
  };
}

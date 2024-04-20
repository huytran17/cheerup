import IUser from "../../database/interfaces/user";
import UserDb from "../../data-access/interfaces/user-db";

export interface ICreateUserPayload extends Partial<IUser> {
  [key: string]: any;
}

export type CreateUser = (payload: ICreateUserPayload) => Promise<IUser>;

export default function makeCreateUser({
  userDb,
}: {
  userDb: UserDb;
}): CreateUser {
  return async function createUser(payload) {
    return await userDb.insert(payload);
  };
}

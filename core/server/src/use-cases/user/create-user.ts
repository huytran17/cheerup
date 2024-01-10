import IUser from "../../database/interfaces/user";
import UserDb from "../../data-access/interfaces/user-db";

export interface ICreateUserPayload extends Partial<IUser> {
  [key: string]: any;
}

interface ICreateUserData {
  userDetails: ICreateUserPayload;
}

export type CreateUser = ({ userDetails }: ICreateUserData) => Promise<IUser>;

export default function makeCreateUser({
  userDb,
}: {
  userDb: UserDb;
}): CreateUser {
  return async function createUser({ userDetails }) {
    return await userDb.insert(userDetails);
  };
}

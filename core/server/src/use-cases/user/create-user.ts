import IUser from "../../database/interfaces/user";
import UserDb from "../../data-access/interfaces/user-db";

export interface ICreateUserData {
  userDetails: Omit<IUser, "_id" | "created_at" | "updated_at" | "deleted_at">;
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

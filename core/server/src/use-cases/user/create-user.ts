import User from "../../database/entities/user";
import IUser from "../../database/interfaces/user";
import UserDb from "../../data-access/interfaces/user-db";

export interface ICreateUserData {
  userDetails: Omit<IUser, "_id" | "created_at" | "updated_at" | "deleted_at">;
}

export type ICreateUser = ({
  userDetails,
}: ICreateUserData) => Promise<User | null>;

export default function makeCreateUser({
  userDb,
}: {
  userDb: UserDb;
}): ICreateUser {
  return async function createUser({
    userDetails,
  }: ICreateUserData): Promise<User | null> {
    const created_user = await userDb.insert(userDetails);
    return created_user;
  };
}

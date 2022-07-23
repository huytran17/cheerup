import User from "../../database/entities/user";
import IUser from "../../database/interfaces/user";
import UserDb from "../../data-access/interfaces/user-db";

export interface ISignUpData {
  userDetails: Omit<IUser, "_id">;
}

export type ISignUp = ({ userDetails }: ISignUpData) => Promise<User | null>;

export default function makeSignUp({ userDb }: { userDb: UserDb }): ISignUp {
  return async function signUp({
    userDetails,
  }: ISignUpData): Promise<User | null> {
    const created_user = await userDb.insert(userDetails);
    return created_user;
  };
}

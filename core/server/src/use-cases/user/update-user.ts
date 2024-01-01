import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export interface IUpdateUserData {
  userDetails: Omit<IUser, "_id">;
}

export type IUpdateUser = ({ userDetails }: IUpdateUserData) => Promise<IUser>;

export default function makeUpdateUser({
  userDb,
}: {
  userDb: IUserDb;
}): IUpdateUser {
  return async function updateUser({ userDetails }) {
    return await userDb.update(userDetails);
  };
}

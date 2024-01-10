import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export interface IUpdateUserPayload extends Partial<IUser> {
  [key: string]: any;
}

export interface IUpdateUser {
  userDetails: IUpdateUserPayload;
}

export type UpdateUser = ({ userDetails }: IUpdateUser) => Promise<IUser>;

export default function makeUpdateUser({
  userDb,
}: {
  userDb: IUserDb;
}): UpdateUser {
  return async function updateUser({ userDetails }) {
    return await userDb.update(userDetails);
  };
}

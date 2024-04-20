import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export interface IUpdateUserPayload extends Partial<IUser> {
  [key: string]: any;
}

export type UpdateUser = (payload: IUpdateUserPayload) => Promise<IUser>;

export default function makeUpdateUser({
  userDb,
}: {
  userDb: IUserDb;
}): UpdateUser {
  return async function updateUser(payload) {
    return await userDb.update(payload);
  };
}

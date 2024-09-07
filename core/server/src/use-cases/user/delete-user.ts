import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export interface IDeleteUser {
  _id: string;
}

export type DeleteUser = ({ _id }: IDeleteUser) => Promise<IUser>;

export default function makeDeleteUser({
  userDb,
}: {
  userDb: IUserDb;
}): DeleteUser {
  return async function deleteUser({ _id }) {
    return await userDb.delete({ _id });
  };
}

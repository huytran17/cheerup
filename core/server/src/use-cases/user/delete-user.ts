import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export interface IDeleteUserPayload {
  _id: string;
}

export type DeleteUser = ({ _id }: IDeleteUserPayload) => Promise<IUser>;

export default function makeDeleteUser({
  userDb,
}: {
  userDb: IUserDb;
}): DeleteUser {
  return async function deleteUser({ _id }) {
    return await userDb.delete({ _id });
  };
}

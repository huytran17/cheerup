import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type GetUser = ({ _id }: { _id: string }) => Promise<IUser>;

export default function makeGetUser({ userDb }: { userDb: IUserDb }): GetUser {
  return async function getUser({ _id }) {
    return await userDb.findById({ _id });
  };
}

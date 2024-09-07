import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export interface IGetUser {
  _id: string;
}

export type GetUser = ({ _id }: IGetUser) => Promise<IUser>;

export default function makeGetUser({ userDb }: { userDb: IUserDb }): GetUser {
  return async function getUser({ _id }) {
    return await userDb.findById({ _id });
  };
}

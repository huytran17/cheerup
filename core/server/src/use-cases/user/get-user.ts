import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export interface IGetUserPayload {
  _id: string;
}

export type GetUser = ({ _id }: IGetUserPayload) => Promise<IUser>;

export default function makeGetUser({ userDb }: { userDb: IUserDb }): GetUser {
  return async function getUser({ _id }) {
    return await userDb.findById({ _id });
  };
}

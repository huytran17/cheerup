import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export interface IGetUserByEmail {
  email: string;
}

export type GetUserByEmail = ({ email }: IGetUserByEmail) => Promise<IUser>;

export default function makeGetUserByEmail({
  userDb,
}: {
  userDb: IUserDb;
}): GetUserByEmail {
  return async function getUserByEmail({ email }) {
    return await userDb.findByEmail({ email });
  };
}

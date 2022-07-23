import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUserByEmail = ({
  email,
}: {
  email: string;
}) => Promise<User | null>;

export default function makeGetUserByEmail({
  userDb,
}: {
  userDb: IUserDb;
}): IGetUserByEmail {
  return async function getUserByEmail({
    email,
  }: {
    email: string;
  }): Promise<User | null> {
    const user = await userDb.findByEmail({ email });
    return user;
  };
}

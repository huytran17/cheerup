import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUserByEmail = ({
  email,
  is_include_deleted,
}: {
  email: string;
  is_include_deleted?: boolean;
}) => Promise<User>;

export default function makeGetUserByEmail({
  userDb,
}: {
  userDb: IUserDb;
}): IGetUserByEmail {
  return async function getUserByEmail({ email, is_include_deleted }) {
    return await userDb.findByEmail({ email, is_include_deleted });
  };
}

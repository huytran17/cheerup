import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type GetUserByEmail = ({
  email,
  is_include_deleted,
}: {
  email: string;
  is_include_deleted?: boolean;
}) => Promise<IUser>;

export default function makeGetUserByEmail({
  userDb,
}: {
  userDb: IUserDb;
}): GetUserByEmail {
  return async function getUserByEmail({ email, is_include_deleted }) {
    return await userDb.findByEmail({ email, is_include_deleted });
  };
}

import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type GetUser = ({
  _id,
  is_include_deleted,
}: {
  _id: string;
  is_include_deleted?: boolean;
}) => Promise<IUser>;

export default function makeGetUser({ userDb }: { userDb: IUserDb }): GetUser {
  return async function getUser({ _id, is_include_deleted }) {
    return await userDb.findById({ _id, is_include_deleted });
  };
}

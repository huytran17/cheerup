import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUser = ({
  _id,
  is_include_deleted,
}: {
  _id: string;
  is_include_deleted?: boolean;
}) => Promise<User>;

export default function makeGetUser({ userDb }: { userDb: IUserDb }): IGetUser {
  return async function getUser({ _id, is_include_deleted }) {
    return await userDb.findById({ _id, is_include_deleted });
  };
}

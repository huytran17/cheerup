import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export interface IGetSoftDeletedUser {
  _id: string;
}

export type GetSoftDeletedUser = ({
  _id,
}: IGetSoftDeletedUser) => Promise<IUser>;

export default function makeGetSoftDeletedUser({
  userDb,
}: {
  userDb: IUserDb;
}): GetSoftDeletedUser {
  return async function getSoftDeletedUser({ _id }) {
    return await userDb.findSoftDeletedById({ _id });
  };
}

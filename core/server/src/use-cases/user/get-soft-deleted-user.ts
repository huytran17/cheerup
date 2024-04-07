import IUser from "../../database/interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";

export interface IGetSoftDeletedUserPayload {
  _id: string;
}

export type GetSoftDeletedUser = ({
  _id,
}: IGetSoftDeletedUserPayload) => Promise<IUser>;

export default function makeGetSoftDeletedUser({
  userDb,
}: {
  userDb: IUserDb;
}): GetSoftDeletedUser {
  return async function getSoftDeletedUser({ _id }) {
    return await userDb.findSoftDeletedById({ _id });
  };
}

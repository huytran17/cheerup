import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export interface IBatchUploadUsers extends Partial<IUser> {
  [key: string]: any;
}

export type BatchUploadUsers = (
  payload: IBatchUploadUsers[]
) => Promise<IUser[]>;

export default function makeBatchUploadUsers({
  userDb,
}: {
  userDb: IUserDb;
}): BatchUploadUsers {
  return async function batchUploadUsers(payload) {
    return await userDb.insertMany(payload);
  };
}

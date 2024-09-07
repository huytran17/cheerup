import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export interface IGetUserTfaSecretByEmail {
  email: string;
}

export type GetUserTfaSecretByEmail = ({
  email,
}: IGetUserTfaSecretByEmail) => Promise<IUser>;

export default function makeGetUserTfaSecretByEmail({
  userDb,
}: {
  userDb: IUserDb;
}): GetUserTfaSecretByEmail {
  return async function getUserTfaSecretByEmail({ email }) {
    return await userDb.findTfaSecretByEmail({ email });
  };
}

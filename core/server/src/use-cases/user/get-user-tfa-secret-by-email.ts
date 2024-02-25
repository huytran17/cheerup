import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export interface IGetUserTfaSecretByEmailPayload {
  email: string;
}

export type GetUserTfaSecretByEmail = ({
  email,
}: IGetUserTfaSecretByEmailPayload) => Promise<IUser>;

export default function makeGetUserTfaSecretByEmail({
  userDb,
}: {
  userDb: IUserDb;
}): GetUserTfaSecretByEmail {
  return async function getUserTfaSecretByEmail({ email }) {
    return await userDb.findTfaSecretByEmail({ email });
  };
}

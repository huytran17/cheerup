import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";
import IPasswordReset from "../../database/interfaces/password-reset";

export interface ICreatePasswordReset extends Partial<IPasswordReset> {
  [key: string]: any;
}

export type CreatePasswordReset = (
  payload: ICreatePasswordReset
) => Promise<IPasswordReset>;

export default function makeCreatePasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): CreatePasswordReset {
  return async function createPasswordReset(payload) {
    return await passwordResetDb.insert(payload);
  };
}

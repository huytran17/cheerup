import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";
import IPasswordReset from "../../database/interfaces/password-reset";

export interface ICreatePasswordResetDataPayload
  extends Partial<IPasswordReset> {
  [key: string]: any;
}

export interface ICreatePasswordReset {
  passwordResetDetails: ICreatePasswordResetDataPayload;
}

export type CreatePasswordReset = ({
  passwordResetDetails,
}: ICreatePasswordReset) => Promise<IPasswordReset>;

export default function makeCreatePasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): CreatePasswordReset {
  return async function createPasswordReset({ passwordResetDetails }) {
    return await passwordResetDb.insert(passwordResetDetails);
  };
}

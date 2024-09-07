import IPasswordReset from "../../database/interfaces/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export interface IGetPasswordReset {
  _id: string;
}

export type GetPasswordReset = ({
  _id,
}: IGetPasswordReset) => Promise<IPasswordReset>;

export default function makeGetPasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): GetPasswordReset {
  return async function getPasswordReset({ _id }) {
    return await passwordResetDb.findById({ _id });
  };
}

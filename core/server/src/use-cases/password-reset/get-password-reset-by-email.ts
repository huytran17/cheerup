import IPasswordReset from "../../database/interfaces/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export interface IGetPasswordResetByEmail {
  email: string;
}

export type GetPasswordResetByEmail = ({
  email,
}: IGetPasswordResetByEmail) => Promise<IPasswordReset>;

export default function makeGetPasswordResetByEmail({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): GetPasswordResetByEmail {
  return async function getPasswordResetByEmail({ email }) {
    return await passwordResetDb.findByEmail({ email });
  };
}

import IPasswordReset from "../../database/interfaces/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export interface IGetPasswordResetByEmailPayload {
  email: string;
}

export type GetPasswordResetByEmail = ({
  email,
}: IGetPasswordResetByEmailPayload) => Promise<IPasswordReset>;

export default function makeGetPasswordResetByEmail({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): GetPasswordResetByEmail {
  return async function getPasswordResetByEmail({ email }) {
    return await passwordResetDb.findByEmail({ email });
  };
}

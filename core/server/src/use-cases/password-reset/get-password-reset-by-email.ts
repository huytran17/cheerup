import PasswordReset from "../../database/entities/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export type IGetPasswordResetByEmail = ({
  email,
}: {
  email: string;
}) => Promise<PasswordReset>;

export default function makeGetPasswordResetByEmail({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): IGetPasswordResetByEmail {
  return async function getPasswordResetByEmail({ email }) {
    return await passwordResetDb.findByEmail({ email });
  };
}

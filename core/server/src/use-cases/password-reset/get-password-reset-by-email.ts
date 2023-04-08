import PasswordReset from "../../database/entities/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export type IGetPasswordResetByEmail = ({
  email,
}: {
  email: string;
}) => Promise<PasswordReset | null>;

export default function makeGetPasswordResetByEmail({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): IGetPasswordResetByEmail {
  return async function getPasswordResetByEmail({
    email,
  }: {
    email: string;
  }): Promise<PasswordReset | null> {
    const password_reset = await passwordResetDb.findByEmail({
      email,
    });

    return password_reset;
  };
}

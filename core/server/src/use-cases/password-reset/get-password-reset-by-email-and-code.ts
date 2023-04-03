import PasswordReset from "../../database/entities/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export type IGetPasswordResetByEmailAndCode = ({
  email,
  security_code,
}: {
  email: string;
  security_code: string;
}) => Promise<PasswordReset | null>;

export default function makeGetPasswordResetByEmailAndCode({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): IGetPasswordResetByEmailAndCode {
  return async function getPasswordResetByEmailAndCode({
    email,
    security_code,
  }: {
    email: string;
    security_code: string;
  }): Promise<PasswordReset | null> {
    const password_reset = await passwordResetDb.findByEmailAndCode({
      email,
      security_code,
    });

    return password_reset;
  };
}

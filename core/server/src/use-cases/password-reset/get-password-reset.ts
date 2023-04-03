import PasswordReset from "../../database/entities/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export type IGetPasswordReset = ({
  _id,
}: {
  _id: string;
}) => Promise<PasswordReset | null>;

export default function makeGetPasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): IGetPasswordReset {
  return async function getPasswordReset({
    _id,
  }: {
    _id: string;
  }): Promise<PasswordReset | null> {
    const password_reset = await passwordResetDb.findById({ _id });
    return password_reset;
  };
}

import PasswordReset from "../../database/entities/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export type IHardDeletePasswordReset = ({
  _id,
}: {
  _id: string;
}) => Promise<PasswordReset | null>;

export default function makeHardDeletePasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): IHardDeletePasswordReset {
  return async function hardDeletePasswordReset({
    _id,
  }: {
    _id: string;
  }): Promise<PasswordReset | null> {
    const deleted = await passwordResetDb.hardDelete({ _id });
    return deleted;
  };
}

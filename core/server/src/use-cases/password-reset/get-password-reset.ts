import PasswordReset from "../../database/entities/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export type IGetPasswordReset = ({
  _id,
}: {
  _id: string;
}) => Promise<PasswordReset>;

export default function makeGetPasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): IGetPasswordReset {
  return async function getPasswordReset({ _id }) {
    return await passwordResetDb.findById({ _id });
  };
}

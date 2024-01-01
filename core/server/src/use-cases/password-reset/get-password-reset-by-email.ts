import IPasswordReset from "../../database/interfaces/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export type IGetPasswordResetByEmail = ({
  email,
}: {
  email: string;
}) => Promise<IPasswordReset>;

export default function makeGetPasswordResetByEmail({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): IGetPasswordResetByEmail {
  return async function getPasswordResetByEmail({ email }) {
    return await passwordResetDb.findByEmail({ email });
  };
}

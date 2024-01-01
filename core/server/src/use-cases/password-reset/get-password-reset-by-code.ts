import IPasswordReset from "../../database/interfaces/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export type IGetPasswordResetByCode = ({
  security_code,
}: {
  security_code: string;
}) => Promise<IPasswordReset>;

export default function makeGetPasswordResetByCode({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): IGetPasswordResetByCode {
  return async function getPasswordResetByCode({ security_code }) {
    return await passwordResetDb.findByCode({
      security_code,
    });
  };
}

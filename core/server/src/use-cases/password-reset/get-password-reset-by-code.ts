import IPasswordReset from "../../database/interfaces/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export interface IGetPasswordResetByCode {
  security_code: string;
}

export type GetPasswordResetByCode = ({
  security_code,
}: IGetPasswordResetByCode) => Promise<IPasswordReset>;

export default function makeGetPasswordResetByCode({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): GetPasswordResetByCode {
  return async function getPasswordResetByCode({ security_code }) {
    return await passwordResetDb.findByCode({
      security_code,
    });
  };
}

import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type IGetTwoFactorAuthenticationByEmailAndCode = ({
  email,
  code,
  type,
}: {
  email: string;
  code: string;
  type: string;
}) => Promise<TwoFactorAuthentication>;

export default function makeGetTwoFactorAuthenticationByEmailAndCode({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): IGetTwoFactorAuthenticationByEmailAndCode {
  return async function getTwoFactorAuthenticationByEmailAndCode({
    email,
    code,
    type,
  }) {
    return await twoFactorAuthenticationDb.findByEmailAndCode({
      email,
      code,
      type,
    });
  };
}

import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export interface IGetTwoFactorAuthenticationByEmailAndCode {
  email: string;
  code: string;
  type: string;
}

export type GetTwoFactorAuthenticationByEmailAndCode = ({
  email,
  code,
  type,
}: IGetTwoFactorAuthenticationByEmailAndCode) => Promise<ITwoFactorAuthentication>;

export default function makeGetTwoFactorAuthenticationByEmailAndCode({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): GetTwoFactorAuthenticationByEmailAndCode {
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

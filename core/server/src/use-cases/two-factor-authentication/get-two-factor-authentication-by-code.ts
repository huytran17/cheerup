import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export interface IGetTwoFactorAuthenticationByCode {
  code: string;
  type: string;
}

export type GetTwoFactorAuthenticationByCode = ({
  code,
  type,
}: IGetTwoFactorAuthenticationByCode) => Promise<ITwoFactorAuthentication>;

export default function makeGetTwoFactorAuthenticationByCode({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): GetTwoFactorAuthenticationByCode {
  return async function getTwoFactorAuthenticationByCode({ code, type }) {
    return await twoFactorAuthenticationDb.findByCode({
      code,
      type,
    });
  };
}

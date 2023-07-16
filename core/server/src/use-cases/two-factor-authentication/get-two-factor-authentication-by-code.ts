import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type IGetTwoFactorAuthenticationByCode = ({
  code,
  type,
}: {
  code: string;
  type: string;
}) => Promise<TwoFactorAuthentication | null>;

export default function makeGetTwoFactorAuthenticationByCode({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): IGetTwoFactorAuthenticationByCode {
  return async function getTwoFactorAuthenticationByCode({
    code,
    type,
  }: {
    code: string;
    type: string;
  }): Promise<TwoFactorAuthentication | null> {
    const two_factor_authentication =
      await twoFactorAuthenticationDb.findByCode({
        code,
        type,
      });

    return two_factor_authentication;
  };
}

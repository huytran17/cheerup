import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type IGetTwoFactorAuthenticationByCode = ({
  code,
}: {
  code: string;
}) => Promise<TwoFactorAuthentication | null>;

export default function makeGetTwoFactorAuthenticationByCode({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): IGetTwoFactorAuthenticationByCode {
  return async function getTwoFactorAuthenticationByCode({
    code,
  }: {
    code: string;
  }): Promise<TwoFactorAuthentication | null> {
    const two_factor_authentication =
      await twoFactorAuthenticationDb.findByCode({
        code,
      });

    return two_factor_authentication;
  };
}

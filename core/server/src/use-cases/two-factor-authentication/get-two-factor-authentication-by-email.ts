import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type IGetTwoFactorAuthenticationByEmail = ({
  email,
  type,
}: {
  email: string;
  type: string;
}) => Promise<TwoFactorAuthentication[] | null>;

export default function makeGetTwoFactorAuthenticationByEmail({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): IGetTwoFactorAuthenticationByEmail {
  return async function getTwoFactorAuthenticationByEmail({
    email,
    type,
  }: {
    email: string;
    type: string;
  }): Promise<TwoFactorAuthentication[] | null> {
    const two_factor_authentication =
      await twoFactorAuthenticationDb.findByEmail({
        email,
        type,
      });

    return two_factor_authentication;
  };
}

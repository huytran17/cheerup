import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type IGetTwoFactorAuthenticationByEmail = ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => Promise<TwoFactorAuthentication | null>;

export default function makeGetTwoFactorAuthenticationByEmail({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): IGetTwoFactorAuthenticationByEmail {
  return async function getTwoFactorAuthenticationByEmail({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<TwoFactorAuthentication | null> {
    const password_reset = await twoFactorAuthenticationDb.findByEmailAndCode({
      email,
      code,
    });

    return password_reset;
  };
}

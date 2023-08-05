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
}) => Promise<TwoFactorAuthentication | null>;

export default function makeGetTwoFactorAuthenticationByEmailAndCode({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): IGetTwoFactorAuthenticationByEmailAndCode {
  return async function getTwoFactorAuthenticationByEmailAndCode({
    email,
    code,
    type,
  }: {
    email: string;
    code: string;
    type: string;
  }): Promise<TwoFactorAuthentication | null> {
    const two_factor_authentication =
      await twoFactorAuthenticationDb.findByEmailAndCode({
        email,
        code,
        type,
      });

    return two_factor_authentication;
  };
}
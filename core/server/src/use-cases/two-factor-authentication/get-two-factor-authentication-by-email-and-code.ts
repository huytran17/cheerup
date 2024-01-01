import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type IGetTwoFactorAuthenticationByEmailAndCode = ({
  email,
  code,
  type,
}: {
  email: string;
  code: string;
  type: string;
}) => Promise<ITwoFactorAuthentication>;

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

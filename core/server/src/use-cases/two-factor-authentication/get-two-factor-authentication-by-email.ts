import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type IGetTwoFactorAuthenticationByEmail = ({
  email,
  type,
}: {
  email: string;
  type: string;
}) => Promise<ITwoFactorAuthentication[]>;

export default function makeGetTwoFactorAuthenticationByEmail({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): IGetTwoFactorAuthenticationByEmail {
  return async function getTwoFactorAuthenticationByEmail({ email, type }) {
    return await twoFactorAuthenticationDb.findByEmail({
      email,
      type,
    });
  };
}

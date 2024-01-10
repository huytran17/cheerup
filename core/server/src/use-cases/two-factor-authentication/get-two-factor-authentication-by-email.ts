import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export interface IGetTwoFactorAuthenticationByEmailPayload {
  email: string;
  type: string;
}

export type GetTwoFactorAuthenticationByEmail = ({
  email,
  type,
}: IGetTwoFactorAuthenticationByEmailPayload) => Promise<
  ITwoFactorAuthentication[]
>;

export default function makeGetTwoFactorAuthenticationByEmail({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): GetTwoFactorAuthenticationByEmail {
  return async function getTwoFactorAuthenticationByEmail({ email, type }) {
    return await twoFactorAuthenticationDb.findByEmail({
      email,
      type,
    });
  };
}

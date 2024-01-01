import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type HardDeleteTwoFactorAuthentication = ({
  _id,
}: {
  _id: string;
}) => Promise<ITwoFactorAuthentication>;

export default function makeHardDeleteTwoFactorAuthentication({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): HardDeleteTwoFactorAuthentication {
  return async function hardDeleteTwoFactorAuthentication({ _id }) {
    return await twoFactorAuthenticationDb.hardDelete({ _id });
  };
}

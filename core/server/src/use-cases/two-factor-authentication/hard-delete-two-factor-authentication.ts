import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export interface IHardDeleteTwoFactorAuthentication {
  _id: string;
}

export type HardDeleteTwoFactorAuthentication = ({
  _id,
}: IHardDeleteTwoFactorAuthentication) => Promise<ITwoFactorAuthentication>;

export default function makeHardDeleteTwoFactorAuthentication({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): HardDeleteTwoFactorAuthentication {
  return async function hardDeleteTwoFactorAuthentication({ _id }) {
    return await twoFactorAuthenticationDb.hardDelete({ _id });
  };
}

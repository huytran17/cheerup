import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type IHardDeleteTwoFactorAuthentication = ({
  _id,
}: {
  _id: string;
}) => Promise<TwoFactorAuthentication>;

export default function makeHardDeleteTwoFactorAuthentication({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): IHardDeleteTwoFactorAuthentication {
  return async function hardDeleteTwoFactorAuthentication({ _id }) {
    return await twoFactorAuthenticationDb.hardDelete({ _id });
  };
}

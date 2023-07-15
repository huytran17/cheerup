import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";

export type IHardDeleteTwoFactorAuthentication = ({
  _id,
}: {
  _id: string;
}) => Promise<TwoFactorAuthentication | null>;

export default function makeHardDeleteTwoFactorAuthentication({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): IHardDeleteTwoFactorAuthentication {
  return async function hardDeleteTwoFactorAuthentication({
    _id,
  }: {
    _id: string;
  }): Promise<TwoFactorAuthentication | null> {
    const deleted = await twoFactorAuthenticationDb.hardDelete({ _id });
    return deleted;
  };
}

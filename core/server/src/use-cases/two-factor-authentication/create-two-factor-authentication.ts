import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";
import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";

export interface ICreateTwoFactorAuthenticationData {
  twoFactorAuthenticationDetails: Omit<
    ITwoFactorAuthentication,
    "_id" | "created_at"
  >;
}

export type ICreateTwoFactorAuthentication = ({
  twoFactorAuthenticationDetails,
}: ICreateTwoFactorAuthenticationData) => Promise<ITwoFactorAuthentication>;

export default function makeCreateTwoFactorAuthentication({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): ICreateTwoFactorAuthentication {
  return async function createTwoFactorAuthentication({
    twoFactorAuthenticationDetails,
  }) {
    return await twoFactorAuthenticationDb.insert(
      twoFactorAuthenticationDetails
    );
  };
}

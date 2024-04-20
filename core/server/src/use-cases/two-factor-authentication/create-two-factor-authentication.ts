import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";
import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";

export interface ICreateTwoFactorAuthenticationPayload
  extends Partial<ITwoFactorAuthentication> {
  [key: string]: any;
}

export type CreateTwoFactorAuthentication = (
  payload: ICreateTwoFactorAuthenticationPayload
) => Promise<ITwoFactorAuthentication>;

export default function makeCreateTwoFactorAuthentication({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): CreateTwoFactorAuthentication {
  return async function createTwoFactorAuthentication(payload) {
    return await twoFactorAuthenticationDb.insert(payload);
  };
}

import ITwoFactorAuthenticationDb from "../../data-access/interfaces/two-factor-authentication-db";
import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";

export interface ICreateTwoFactorAuthenticationPayload
  extends Partial<ITwoFactorAuthentication> {
  [key: string]: any;
}

interface ICreateTwoFactorAuthentication {
  twoFactorAuthenticationDetails: ICreateTwoFactorAuthenticationPayload;
}

export type CreateTwoFactorAuthentication = ({
  twoFactorAuthenticationDetails,
}: ICreateTwoFactorAuthentication) => Promise<ITwoFactorAuthentication>;

export default function makeCreateTwoFactorAuthentication({
  twoFactorAuthenticationDb,
}: {
  twoFactorAuthenticationDb: ITwoFactorAuthenticationDb;
}): CreateTwoFactorAuthentication {
  return async function createTwoFactorAuthentication({
    twoFactorAuthenticationDetails,
  }) {
    return await twoFactorAuthenticationDb.insert(
      twoFactorAuthenticationDetails
    );
  };
}

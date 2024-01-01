import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";

export default interface ITwoFactorAuthenticationDb {
  findByEmail: ({
    email,
    type,
  }: {
    email: string;
    type: string;
  }) => Promise<ITwoFactorAuthentication[]>;
  findByCode: ({
    code,
    type,
  }: {
    code: string;
    type: string;
  }) => Promise<ITwoFactorAuthentication>;
  findByEmailAndCode: ({
    email,
    code,
    type,
  }: {
    email: string;
    code: string;
    type: string;
  }) => Promise<ITwoFactorAuthentication>;
  insert: (
    payload: Partial<ITwoFactorAuthentication>
  ) => Promise<ITwoFactorAuthentication>;
  hardDelete: ({ _id }: { _id: string }) => Promise<ITwoFactorAuthentication>;
}

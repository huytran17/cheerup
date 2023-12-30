import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";

export default interface ITwoFactorAuthenticationDb {
  findByEmail: ({
    email,
    type,
  }: {
    email: string;
    type: string;
  }) => Promise<TwoFactorAuthentication[]>;
  findByCode: ({
    code,
    type,
  }: {
    code: string;
    type: string;
  }) => Promise<TwoFactorAuthentication>;
  findByEmailAndCode: ({
    email,
    code,
    type,
  }: {
    email: string;
    code: string;
    type: string;
  }) => Promise<TwoFactorAuthentication>;
  insert: (
    payload: Partial<ITwoFactorAuthentication>
  ) => Promise<TwoFactorAuthentication>;
  hardDelete: ({ _id }: { _id: string }) => Promise<TwoFactorAuthentication>;
}

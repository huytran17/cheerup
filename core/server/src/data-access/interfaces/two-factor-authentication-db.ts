import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";

export default interface ITwoFactorAuthenticationDb {
  findByCode: ({
    code,
  }: {
    code: string;
  }) => Promise<TwoFactorAuthentication | null>;
  findByEmailAndCode: ({
    email,
    code,
  }: {
    email: string;
    code: string;
  }) => Promise<TwoFactorAuthentication | null>;
  insert: (
    payload: Partial<ITwoFactorAuthentication>
  ) => Promise<TwoFactorAuthentication | null>;
  hardDelete: ({
    _id,
  }: {
    _id: string;
  }) => Promise<TwoFactorAuthentication | null>;
}

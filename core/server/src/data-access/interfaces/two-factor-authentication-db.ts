import TwoFactorAuthentication from "../../database/entities/two-factor-authentication";
import ITwoFactorAuthentication from "../../database/interfaces/two-factor-authentication";

export default interface ITwoFactorAuthenticationDb {
  findByEmail: ({
    email,
    type,
  }: {
    email: string;
    type: string;
  }) => Promise<TwoFactorAuthentication[] | null>;
  findByCode: ({
    code,
    type,
  }: {
    code: string;
    type: string;
  }) => Promise<TwoFactorAuthentication | null>;
  findByEmailAndCode: ({
    email,
    code,
    type,
  }: {
    email: string;
    code: string;
    type: string;
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

import PasswordReset from "../../database/entities/password-reset";
import IPasswordReset from "../../database/interfaces/password-reset";

export default interface IPasswordResetDb {
  findByCode: ({
    security_code,
  }: {
    security_code: string;
  }) => Promise<PasswordReset | null>;
  findByEmail: ({ email }: { email: string }) => Promise<PasswordReset | null>;
  insert: (payload: Partial<IPasswordReset>) => Promise<PasswordReset | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<PasswordReset | null>;
  findById: ({ _id }: { _id: string }) => Promise<PasswordReset | null>;
}

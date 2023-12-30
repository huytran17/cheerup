import PasswordReset from "../../database/entities/password-reset";
import IPasswordReset from "../../database/interfaces/password-reset";

export default interface IPasswordResetDb {
  findByCode: ({
    security_code,
  }: {
    security_code: string;
  }) => Promise<PasswordReset>;
  findByEmail: ({ email }: { email: string }) => Promise<PasswordReset>;
  insert: (payload: Partial<IPasswordReset>) => Promise<PasswordReset>;
  hardDelete: ({ _id }: { _id: string }) => Promise<PasswordReset>;
  findById: ({ _id }: { _id: string }) => Promise<PasswordReset>;
}

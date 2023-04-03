import PasswordReset from "../../database/entities/password-reset";
import IPasswordReset from "../../database/interfaces/password-reset";

export default interface IPasswordResetDb {
  findByEmailAndCode: ({
    email,
    security_code,
  }: {
    email: string;
    security_code: string;
  }) => Promise<PasswordReset | null>;
  insert: (payload: Partial<IPasswordReset>) => Promise<PasswordReset | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<PasswordReset | null>;
}

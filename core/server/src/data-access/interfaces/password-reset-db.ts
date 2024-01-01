import IPasswordReset from "../../database/interfaces/password-reset";

export default interface IPasswordResetDb {
  findByCode: ({
    security_code,
  }: {
    security_code: string;
  }) => Promise<IPasswordReset>;
  findByEmail: ({ email }: { email: string }) => Promise<IPasswordReset>;
  insert: (payload: Partial<IPasswordReset>) => Promise<IPasswordReset>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IPasswordReset>;
  findById: ({ _id }: { _id: string }) => Promise<IPasswordReset>;
}

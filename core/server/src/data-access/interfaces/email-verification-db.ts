import EmailVerification from "../../database/entities/email-verification";
import IEmailVerification from "../../database/interfaces/email-verification";
export default interface IEmailVerificationDb {
  findAll: () => Promise<EmailVerification[] | null>;
  findByEmail: ({
    email,
  }: {
    email: string;
  }) => Promise<EmailVerification | null>;
  findByEmailAndVerificationCode: ({
    email,
    verification_code,
  }: {
    email: string;
    verification_code: string;
  }) => Promise<EmailVerification | null>;
  findById: ({ _id }: { _id: string }) => Promise<EmailVerification | null>;
  insert: (
    payload: Partial<IEmailVerification>
  ) => Promise<EmailVerification | null>;
  delete: ({ _id }: { _id: string }) => Promise<EmailVerification | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<EmailVerification | null>;
}

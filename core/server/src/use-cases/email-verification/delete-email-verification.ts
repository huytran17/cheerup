import EmailVerification from "../../database/entities/email-verification";
import IEmailVerificationDb from "../../data-access/interfaces/email-verification-db";

export type IDeleteEmailVerification = ({
  _id,
}: {
  _id: string;
}) => Promise<EmailVerification | null>;

export default function makeDeleteEmailVerification({
  emailVerificationDb,
}: {
  emailVerificationDb: IEmailVerificationDb;
}): IDeleteEmailVerification {
  return async function deleteEmailVerification({
    _id,
  }: {
    _id: string;
  }): Promise<EmailVerification | null> {
    const email_verification = await emailVerificationDb.delete({ _id });
    return email_verification;
  };
}

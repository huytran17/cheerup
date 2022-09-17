import EmailVerification from "../../database/entities/email-verification";
import IEmailVerificationDb from "../../data-access/interfaces/email-verification-db";

export type IHardDeleteEmailVerification = ({
  _id,
}: {
  _id: string;
}) => Promise<EmailVerification | null>;

export default function makeHardDeleteEmailVerification({
  emailVerificationDb,
}: {
  emailVerificationDb: IEmailVerificationDb;
}): IHardDeleteEmailVerification {
  return async function hardDeleteEmailVerification({
    _id,
  }: {
    _id: string;
  }): Promise<EmailVerification | null> {
    const email_verification = await emailVerificationDb.hardDelete({ _id });
    return email_verification;
  };
}

import { Logger } from "winston";
import EmailVerification from "../../database/entities/email-verification";
import IEmailVerificationDb from "../../data-access/interfaces/email-verification-db";

export type IGetEmailVerifications = () => Promise<EmailVerification[] | null>;

export default function makeGetEmailVerifications({
  emailVerificationDb,
  logger,
}: {
  emailVerificationDb: IEmailVerificationDb;
  logger: Logger;
}): IGetEmailVerifications {
  return async function getEmailVerifications(): Promise<
    EmailVerification[] | null
  > {
    const email_verifications = await emailVerificationDb.findAll();
    return email_verifications;
  };
}

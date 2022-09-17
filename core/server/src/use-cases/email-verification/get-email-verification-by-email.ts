import EmailVerification from "../../database/entities/email-verification";
import IEmailVerificationDb from "../../data-access/interfaces/email-verification-db";
import { Logger } from "winston";

export type IGetEmailVerificationByEmail = ({
  email,
}: {
  email: string;
}) => Promise<EmailVerification | null>;

export default function makeGetEmailVerificationByEmail({
  emailVerificationDb,
  logger,
}: {
  emailVerificationDb: IEmailVerificationDb;
  logger: Logger;
}): IGetEmailVerificationByEmail {
  return async function getEmailVerificationByEmail({
    email,
  }: {
    email: string;
  }): Promise<EmailVerification | null> {
    const email_verification = await emailVerificationDb.findByEmail({ email });
    return email_verification;
  };
}

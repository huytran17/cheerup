import EmailVerification from "../../database/entities/email-verification";
import IEmailVerificationDb from "../../data-access/interfaces/email-verification-db";
import { Logger } from "winston";

export type IGetEmailVerificationByEmailAndVerificationCode = ({
  email,
  verification_code,
}: {
  email: string;
  verification_code: string;
}) => Promise<EmailVerification | null>;

export default function makeGetEmailVerificationByEmailAndVerificationCode({
  emailVerificationDb,
  logger,
}: {
  emailVerificationDb: IEmailVerificationDb;
  logger: Logger;
}): IGetEmailVerificationByEmailAndVerificationCode {
  return async function getEmailVerificationByEmailAndVerificationCode({
    email,
    verification_code,
  }: {
    email: string;
    verification_code: string;
  }): Promise<EmailVerification | null> {
    const email_verification =
      await emailVerificationDb.findByEmailAndVerificationCode({
        email,
        verification_code,
      });

    return email_verification;
  };
}

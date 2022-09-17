import EmailVerification from "../../database/entities/email-verification";
import IEmailVerificationDb from "../../data-access/interfaces/email-verification-db";
import { Logger } from "winston";

export type IGetEmailVerification = ({
  _id,
}: {
  _id: string;
}) => Promise<EmailVerification | null>;

export default function makeGetEmailVerification({
  emailVerificationDb,
  logger,
}: {
  emailVerificationDb: IEmailVerificationDb;
  logger: Logger;
}): IGetEmailVerification {
  return async function getEmailVerification({
    _id,
  }: {
    _id: string;
  }): Promise<EmailVerification | null> {
    const email_verification = await emailVerificationDb.findById({ _id });
    return email_verification;
  };
}

import EmailVerification from "../../database/entities/email-verification";
import IEmailVerificationDb from "../../data-access/interfaces/email-verification-db";
import IEmailVerification from "../../database/interfaces/email-verification";

export interface ICreateEmailVerificationData {
  emailVerificationDetails: Omit<IEmailVerification, "_id">;
}

export type ICreateEmailVerification = ({
  emailVerificationDetails,
}: ICreateEmailVerificationData) => Promise<EmailVerification | null>;

export default function makeCreateEmailVerification({
  emailVerificationDb,
}: {
  emailVerificationDb: IEmailVerificationDb;
}): ICreateEmailVerification {
  return async function createEmailVerification({
    emailVerificationDetails,
  }: ICreateEmailVerificationData): Promise<EmailVerification | null> {
    const email_verification = await emailVerificationDb.insert(
      emailVerificationDetails
    );
    return email_verification;
  };
}

import _ from "lodash";
import { IEmailData } from "./get-email-content";
import { Mailer } from "./mailer";
import { Logger } from "winston";

export type ISendEmail = (mailContent: IEmailData) => Promise<string>;

export default function makeSendEmail({
  mailer,
  logger,
}: {
  mailer: Mailer;
  logger: Logger;
}): ISendEmail {
  return async function sendEmail(mailContent: IEmailData): Promise<string> {
    const sent = await mailer.sendMail(mailContent);
    return mailContent.text;
  };
}

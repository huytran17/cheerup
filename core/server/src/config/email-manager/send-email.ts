import _ from "lodash";
import { IEmailData } from "./get-email-content";
import { Mailer } from "./mailer";

export type SendEmail = (mailContent: IEmailData) => Promise<string>;

export default function makeSendEmail({
  mailer,
}: {
  mailer: Mailer;
}): SendEmail {
  return async function sendEmail(mailContent) {
    await mailer.sendMail(mailContent);
    return mailContent.text;
  };
}

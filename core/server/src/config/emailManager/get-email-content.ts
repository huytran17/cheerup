import { IHtmlToText } from "../../utils/html-to-text";

interface IGetEmailContentData {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  type: string;
  from?: string;
  sender_name?: string;
}
export type IGetEmailContent = ({
  to,
  type,
}: IGetEmailContentData) => Promise<IEmailData>;

export interface IEmailData {
  to: string | string[];
  from: string;
  subject: string;
  text: string;
  html: string;
  sender_name?: string;
}

export default function makeGetEmailContent({
  emailTextTemplate,
  subjectTemplate,
  htmlToText,
  email_from,
  email_sender_name = "Huy Tran",
}: {
  emailTextTemplate: { [type: string]: string };
  subjectTemplate: { [type: string]: string };
  htmlToText: IHtmlToText;
  email_from: string;
  email_sender_name?: string;
}) {
  return async function getEmailContent({
    to,
    cc = [],
    bcc = [],
    type,
    from,
    sender_name,
  }: IGetEmailContentData): Promise<IEmailData> {
    const invalid_destination = !to || (to && to.length === 0);
    if (invalid_destination) {
      throw new Error(`email ${to} cannot be empty.`);
    }

    const template_html_message = emailTextTemplate[type];
    const subject_message = subjectTemplate[type];

    const final_from = from || email_from;
    const final_sender_name = sender_name || email_sender_name;

    const text = htmlToText(template_html_message);
    const email_content = {
      to,
      cc,
      bcc,
      from: `${final_sender_name} ${final_from}`,
      subject: subject_message,
      text,
      html: template_html_message,
    };

    return Object.freeze(email_content);
  };
}

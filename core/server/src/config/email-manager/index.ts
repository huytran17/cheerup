import mailer from "./mailer";

import {
  emailTextTemplate,
  subjectTemplate,
  defaultTemplateData,
} from "./templates";
import makeSendEmail from "./send-email";
import { htmlToText } from "../html-to-text";
import makeGetEmailContent, { GetEmailContent } from "./get-email-content";
import makeRenderEmailContent from "./render-email-content";

const email_from = process.env.EMAIL_FROM || "huytran@gmail.com";
const email_sender_name = process.env.EMAIL_SENDER_NAME || "Huy Tran Blog";

const sendEmail = makeSendEmail({ mailer });
const getEmailContent: GetEmailContent = makeGetEmailContent({
  emailTextTemplate,
  subjectTemplate,
  htmlToText,
  email_from,
  email_sender_name,
});

const renderEmailContent = makeRenderEmailContent({
  mailer,
  defaultTemplateData,
});

export default Object.freeze({
  sendEmail,
  getEmailContent,
  renderEmailContent,
});

export { sendEmail, getEmailContent, renderEmailContent };

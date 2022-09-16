import makeSendEmail from "./send-email";
import mailer from "./mailer";
import { logger } from "../logs/logger";

import {
  emailTextTemplate,
  subjectTemplate,
  defaultTemplateData,
} from "./templates";
import { htmlToText } from "../../utils/html-to-text";
import makeGetEmailContent from "./get-email-content";
import makeRenderEmailContent from "./render-email-content";

const email_from = process.env.EMAIL_FROM || "huytran@gmail.com";
const email_sender_name = process.env.EMAIL_SENDER_NAME || "Huy Tran Blog";

const sendEmail = makeSendEmail({ mailer, logger });
const getEmailContent = makeGetEmailContent({
  emailTextTemplate,
  subjectTemplate,
  htmlToText,
  email_from,
  email_sender_name,
});

/**
 * @description render the email content
 */
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

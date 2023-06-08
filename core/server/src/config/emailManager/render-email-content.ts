import { merge } from "lodash";
import { IEmailData } from "./get-email-content";
import { Mailer } from "./mailer";

interface IRenderEmailContentData {
  email_content: IEmailData;
  user_template_data: { [key: string]: string | any };
  object_data?: { [key: string]: any };
}

export type IRenderEmailContent = ({
  email_content,
  user_template_data,
  object_data,
}: IRenderEmailContentData) => Promise<IEmailData>;

export default function makeRenderEmailContent({
  mailer,
  defaultTemplateData,
}: {
  mailer: Mailer;
  defaultTemplateData: { [key: string]: string };
}): IRenderEmailContent {
  return async function renderEmailContent({
    email_content,
    user_template_data,
    object_data,
  }: IRenderEmailContentData): Promise<IEmailData> {
    let final_email_content = merge({}, email_content);

    const has_no_subject = !final_email_content.subject;
    has_no_subject &&
      (final_email_content = merge(final_email_content, {
        subject: "",
      }));

    const has_no_content = !final_email_content.html;
    has_no_content &&
      (final_email_content = merge(final_email_content, { html: "" }));

    const email_data = merge(
      {},
      defaultTemplateData,
      user_template_data
    );

    const rendered_subject = mailer.render({
      email_content: final_email_content.subject,
      email_data,
      object_data,
    });

    const rendered_html = mailer.render({
      email_content: final_email_content.html,
      email_data,
      object_data,
    });

    const rendered_mail_content = merge({}, final_email_content, {
      subject: rendered_subject,
      html: rendered_html,
    });

    return rendered_mail_content;
  };
}

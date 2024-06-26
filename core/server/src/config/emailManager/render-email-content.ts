import { IEmailData } from "./get-email-content";
import { Mailer } from "./mailer";

interface IRenderEmailContentData {
  email_content: IEmailData;
  user_template_data: { [key: string]: string | any };
  object_data?: { [key: string]: any };
}

export type RenderEmailContent = ({
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
}): RenderEmailContent {
  return async function renderEmailContent({
    email_content,
    user_template_data,
    object_data,
  }) {
    let final_email_content = email_content;

    const has_no_subject = !email_content.subject;
    if (has_no_subject) {
      final_email_content = {
        ...final_email_content,
        subject: "",
      };
    }

    const has_no_content = !final_email_content.html;
    if (has_no_content) {
      final_email_content = { ...final_email_content, html: "" };
    }

    const email_data = { ...defaultTemplateData, ...user_template_data };

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

    const rendered_mail_content: IEmailData = {
      ...final_email_content,
      subject: rendered_subject,
      html: rendered_html,
    };

    return rendered_mail_content;
  };
}

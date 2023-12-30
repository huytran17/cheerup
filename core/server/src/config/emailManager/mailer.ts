import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import { IEmailData } from "./get-email-content";
import { merge } from "lodash";

let mailer: undefined | Transporter | any = undefined;
export function initializeMailer(): Transporter {
  if (mailer) {
    return mailer;
  }

  const valid_environment =
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production";

  if (!valid_environment) {
    console.log(`Mailer got invalid environment: ${process.env.NODE_ENV}.`);
    mailer = {
      sendMail: (): void => {
        console.log("Mailer is not set up yet.");
        return null;
      },
    };

    return mailer;
  }

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });

  transport.verify((error: any, success: any) =>
    error
      ? console.error(error)
      : console.log("SMTP Server is ready to take your email")
  );

  return transport;
}

export type Mailer = {
  sendMail: (emailData: IEmailData) => Promise<IEmailData>;
  render: ({
    email_content,
    email_data,
    object_data,
  }: {
    email_content: string;
    email_data: { [key: string]: string };
    object_data?: { [key: string]: any };
  }) => string;
};

export default Object.freeze({
  sendMail: async (payload: IEmailData) => {
    const transport = initializeMailer();

    transport.sendMail(payload).catch((error) => {
      console.error(error);
    });

    return payload;
  },
  render: ({
    email_content,
    email_data,
    object_data,
  }: {
    email_content: string;
    email_data: { [key: string]: string };
    object_data?: { [key: string]: any };
  }) => {
    const final_email_data = merge({}, email_data, object_data);
    const template = handlebars.compile(email_content);
    return template(final_email_data);
  },
});

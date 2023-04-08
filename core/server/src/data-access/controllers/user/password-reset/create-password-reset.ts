import randomString from "randomString";
import { Request } from "express";
import Moment from "moment";
import { Logger } from "winston";
import { get } from "lodash";
import { ICreatePasswordReset } from "../../../../use-cases/password-reset/create-password-reset";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IGetEmailContent } from "../../../../config/emailManager/get-email-content";
import { IRenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { ISendEmail } from "../../../../config/emailManager/send-email";

export default function makeCreatePasswordResetController({
  createPasswordReset,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  moment,
  logger,
}: {
  createPasswordReset: ICreatePasswordReset;
  getEmailContent: IGetEmailContent;
  renderEmailContent: IRenderEmailContent;
  sendEmail: ISendEmail;
  moment: typeof Moment;
  logger: Logger;
}) {
  return async function createPasswordResetController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = get(httpRequest, "context.validated");

      const code = randomString.generate(6);
      const expire_at = moment().add(15, "minutes").toDate();

      const payload = {
        email,
        security_code: code,
        expire_at,
      };

      const created_password_reset = await createPasswordReset({
        passwordResetDetails: payload,
      });

      const email_content = await getEmailContent({
        to: email,
        type: "forget-password-verification-code",
      });

      const rendered_email_content = await renderEmailContent({
        email_content,
        user_template_data: {
          email,
          code,
        },
      });

      logger.verbose(`Sending verifycation email to ${email}...`);

      await sendEmail(rendered_email_content);

      logger.verbose(`Sent verifycation email to ${email}...`);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_password_reset,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

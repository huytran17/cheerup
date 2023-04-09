import { Request } from "express";
import { get, omit } from "lodash";
import Moment from "moment";
import randomString from "randomstring";
import { Logger } from "winston";

import { IGetEmailContent } from "../../../../config/emailManager/get-email-content";
import { IRenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { ISendEmail } from "../../../../config/emailManager/send-email";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { ICreatePasswordReset } from "../../../../use-cases/password-reset/create-password-reset";
import { IGetPasswordResetByCode } from "../../../../use-cases/password-reset/get-password-reset-by-code";
import { IGetPasswordResetByEmail } from "../../../../use-cases/password-reset/get-password-reset-by-email";
import { IHardDeletePasswordReset } from "../../../../use-cases/password-reset/hard-delete-password-reset";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreatePasswordResetController({
  getUserByEmail,
  createPasswordReset,
  getPasswordResetByCode,
  getPasswordResetByEmail,
  hardDeletePasswordReset,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  moment,
  logger,
}: {
  getUserByEmail: IGetUserByEmail;
  createPasswordReset: ICreatePasswordReset;
  getPasswordResetByCode: IGetPasswordResetByCode;
  getPasswordResetByEmail: IGetPasswordResetByEmail;
  hardDeletePasswordReset: IHardDeletePasswordReset;
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

      const user_exists = await getUserByEmail({ email });
      if (isEmpty(user_exists)) {
        throw new Error(`User by ${email} does not exist.`);
      }

      const password_reset = await getPasswordResetByEmail({ email });

      !isEmpty(password_reset) &&
        (await hardDeletePasswordReset({ _id: password_reset._id }));

      let security_code = randomString.generate(6);
      let existed = await getPasswordResetByCode({ security_code });

      while (!isEmpty(existed)) {
        security_code = randomString.generate(6);
        existed = await getPasswordResetByCode({ security_code });
      }

      const expire_at = moment().add(15, "minutes").toDate();

      const payload = {
        email,
        security_code,
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
          security_code,
        },
      });

      logger.verbose(`Sending verifycation email to ${email}...`);

      await sendEmail(rendered_email_content);

      logger.verbose(`Sent verifycation email to ${email}...`);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: omit(created_password_reset, "security_code"),
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
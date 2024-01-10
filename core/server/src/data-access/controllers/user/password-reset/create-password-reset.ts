import { Request } from "express";
import { get, omit } from "lodash";
import Moment from "moment";
import randomString from "randomstring";
import { Logger } from "winston";
import { GetEmailContent } from "../../../../config/emailManager/get-email-content";
import { RenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { SendEmail } from "../../../../config/emailManager/send-email";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { CreatePasswordReset } from "../../../../use-cases/password-reset/create-password-reset";
import { GetPasswordResetByCode } from "../../../../use-cases/password-reset/get-password-reset-by-code";
import { GetPasswordResetByEmail } from "../../../../use-cases/password-reset/get-password-reset-by-email";
import { HardDeletePasswordReset } from "../../../../use-cases/password-reset/hard-delete-password-reset";
import {
  GetUserByEmail,
  IGetUserByEmailPayload,
} from "../../../../use-cases/user/get-user-by-email";
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
  getUserByEmail: GetUserByEmail;
  createPasswordReset: CreatePasswordReset;
  getPasswordResetByCode: GetPasswordResetByCode;
  getPasswordResetByEmail: GetPasswordResetByEmail;
  hardDeletePasswordReset: HardDeletePasswordReset;
  getEmailContent: GetEmailContent;
  renderEmailContent: RenderEmailContent;
  sendEmail: SendEmail;
  moment: typeof Moment;
  logger: Logger;
}) {
  return async function createPasswordResetController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = <IGetUserByEmailPayload>(
        get(httpRequest, "context.validated", {})
      );

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

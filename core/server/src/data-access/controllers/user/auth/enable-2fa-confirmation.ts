import { Request } from "express";
import Moment from "moment";
import randomString from "randomstring";
import { TwoFAType } from "../../../../database/interfaces/two-factor-authentication";
import { GetEmailContent } from "../../../../config/emailManager/get-email-content";
import { RenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { SendEmail } from "../../../../config/emailManager/send-email";
import { get, omit, map } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { CreateTwoFactorAuthentication } from "../../../../use-cases/two-factor-authentication/create-two-factor-authentication";
import { GetTwoFactorAuthenticationByEmailAndCode } from "../../../../use-cases/two-factor-authentication/get-two-factor-authentication-by-email-and-code";
import { GetTwoFactorAuthenticationByEmail } from "../../../../use-cases/two-factor-authentication/get-two-factor-authentication-by-email";
import { HardDeleteTwoFactorAuthentication } from "../../../../use-cases/two-factor-authentication/hard-delete-two-factor-authentication";
import { isEmpty } from "../../../../utils/is-empty";
import { Logger } from "winston";
import IUser from "../../../../database/interfaces/user";

export default function makeEnable2FAConfirmationController({
  createTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmail,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmailAndCode,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  logger,
  moment,
}: {
  createTwoFactorAuthentication: CreateTwoFactorAuthentication;
  getTwoFactorAuthenticationByEmail: GetTwoFactorAuthenticationByEmail;
  hardDeleteTwoFactorAuthentication: HardDeleteTwoFactorAuthentication;
  getTwoFactorAuthenticationByEmailAndCode: GetTwoFactorAuthenticationByEmailAndCode;
  getEmailContent: GetEmailContent;
  renderEmailContent: RenderEmailContent;
  sendEmail: SendEmail;
  logger: Logger;
  moment: typeof Moment;
}) {
  return async function enable2FAConfirmationController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = <IUser>get(httpRequest, "context.user", {});

      const existed = await getTwoFactorAuthenticationByEmail({
        email,
        type: TwoFAType.ENABLE,
      });

      const delete_existed_promises = map(
        existed,
        async (tfa) => await hardDeleteTwoFactorAuthentication({ _id: tfa._id })
      );

      await Promise.all(delete_existed_promises);

      const generateCode = () =>
        randomString.generate({
          length: 6,
          charset: "numeric",
        });

      const get2FAByEmailAndCode = async () =>
        await getTwoFactorAuthenticationByEmailAndCode({
          code,
          email,
          type: TwoFAType.ENABLE,
        });

      let code = generateCode();
      let code_exists = await get2FAByEmailAndCode();

      while (!isEmpty(code_exists)) {
        code = generateCode();
        code_exists = await get2FAByEmailAndCode();
      }

      const expire_at = moment().add(5, "minutes").toDate();

      const twoFactorAuthenticationDetails = {
        code,
        expire_at,
        email,
        type: TwoFAType.ENABLE,
      };

      const two_fa = await createTwoFactorAuthentication({
        twoFactorAuthenticationDetails,
      });

      const email_content = await getEmailContent({
        to: email,
        type: "enable-2fa-confirmation",
      });

      const rendered_email_content = await renderEmailContent({
        email_content,
        user_template_data: {
          code,
        },
      });

      logger.verbose(`Sending email to ${email}...`);

      await sendEmail(rendered_email_content);

      logger.verbose(`Sent email to ${email}...`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: omit(two_fa, "code"),
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

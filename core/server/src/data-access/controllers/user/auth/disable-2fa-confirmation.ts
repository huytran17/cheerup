import { Request } from "express";
import { get, map, omit } from "lodash";
import Moment from "moment";
import { Logger } from "winston";
import { GetEmailContent } from "../../../../config/email-manager/get-email-content";
import { RenderEmailContent } from "../../../../config/email-manager/render-email-content";
import { SendEmail } from "../../../../config/email-manager/send-email";
import { RandomString } from "../../../../config/randomstring/make-random-string";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { TwoFAType } from "../../../../database/interfaces/two-factor-authentication";
import IUser from "../../../../database/interfaces/user";
import { CreateTwoFactorAuthentication } from "../../../../use-cases/two-factor-authentication/create-two-factor-authentication";
import { GetTwoFactorAuthenticationByEmail } from "../../../../use-cases/two-factor-authentication/get-two-factor-authentication-by-email";
import { GetTwoFactorAuthenticationByEmailAndCode } from "../../../../use-cases/two-factor-authentication/get-two-factor-authentication-by-email-and-code";
import { HardDeleteTwoFactorAuthentication } from "../../../../use-cases/two-factor-authentication/hard-delete-two-factor-authentication";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeDisable2FAConfirmationController({
  createTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmail,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmailAndCode,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  randomString,
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
  randomString: RandomString;
  logger: Logger;
  moment: typeof Moment;
}) {
  return async function disable2FAConfirmationController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = <IUser>get(httpRequest, "context.user", {});

      const existed = await getTwoFactorAuthenticationByEmail({
        email,
        type: TwoFAType.DISABLE,
      });

      const delete_existed_promises = map(
        existed,
        async (tfa) => await hardDeleteTwoFactorAuthentication({ _id: tfa._id })
      );

      await Promise.all(delete_existed_promises);

      const generateCode = () => randomString();

      const get2FAByEmailAndCode = async () =>
        await getTwoFactorAuthenticationByEmailAndCode({
          code,
          email,
          type: TwoFAType.DISABLE,
        });

      let code = generateCode();
      let code_exists = await get2FAByEmailAndCode();

      while (!isEmpty(code_exists)) {
        code = generateCode();
        code_exists = await get2FAByEmailAndCode();
      }

      const expire_at = moment().add(5, "minutes").toDate();

      const two_fa = await createTwoFactorAuthentication({
        code,
        expire_at,
        email,
        type: TwoFAType.DISABLE,
      });

      const email_content = await getEmailContent({
        to: email,
        type: "disable-2fa-confirmation",
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

import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import _ from "lodash";
import { Logger } from "winston";
import { ISendEmail } from "../../../../config/emailManager/send-email";
import { IRenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { IGetEmailContent } from "../../../../config/emailManager/get-email-content";
import { IGenerateOtpCode } from "../../../../config/otp/generate-otp-code";
import { ICreateEmailVerification } from "../../../../use-cases/email-verification/create-email-verification";
import Moment from "moment";

export default function makeSendEmailVerificationCodeController({
  getUser,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  generateOtpCode,
  createEmailVerification,
  logger,
  moment,
}: {
  getUser: IGetUser;
  getEmailContent: IGetEmailContent;
  renderEmailContent: IRenderEmailContent;
  sendEmail: ISendEmail;
  generateOtpCode: IGenerateOtpCode;
  createEmailVerification: ICreateEmailVerification;
  logger: Logger;
  moment: typeof Moment;
}) {
  return async function sendEmailVerificationCodeController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = _.get(httpRequest, "context.user");
      const exists = await getUser({ _id: user_id });
      if (!exists) {
        throw new Error(`User ${user_id} does not exists`);
      }

      const { email: user_email, full_name } = exists;

      const email_content = await getEmailContent({
        to: user_email,
        type: "get-email-verification-code",
      });

      const verification_code = generateOtpCode({
        length: 6,
        options: {
          specialChars: false,
          lowerCaseAlphabets: false,
        },
      });

      const rendered_email_content = await renderEmailContent({
        email_content,
        user_template_data: {
          verification_code,
          full_name,
        },
      });

      await sendEmail(rendered_email_content);

      const email_verification_data = Object.assign(
        {},
        {
          email: user_email,
          verification_code,
          expire_at: moment(new Date()).add(15, "minutes").toDate(),
        }
      );

      const created_email_verification = await createEmailVerification({
        emailVerificationDetails: email_verification_data,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: created_email_verification,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}

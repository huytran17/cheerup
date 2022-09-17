import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import _ from "lodash";
import { Logger } from "winston";
import { ISendEmail } from "../../../../config/emailManager/send-email";
import { IRenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { IGetEmailContent } from "../../../../config/emailManager/get-email-content";

export default function makeGetEmailVerificationCodeController({
  getUser,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  logger,
}: {
  getUser: IGetUser;
  getEmailContent: IGetEmailContent;
  renderEmailContent: IRenderEmailContent;
  sendEmail: ISendEmail;
  logger: Logger;
}) {
  return async function getEmailVerificationCodeController(
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

      const verification_code = "";

      const rendered_email_content = await renderEmailContent({
        email_content,
        user_template_data: {
          verification_code,
          full_name,
        },
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
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

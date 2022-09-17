import { Request } from "express";
import { IGetEmailVerificationByEmail } from "../../../../use-cases/email-verification/get-email-verification-by-email";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetEmailVerificationByEmailController({
  getEmailVerificationByEmail,
  logger,
}: {
  getEmailVerificationByEmail: IGetEmailVerificationByEmail;
  logger: Logger;
}) {
  return async function getEmailVerificationByEmailController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email } = _.get(httpRequest, "context.validated");
      const exists = await getEmailVerificationByEmail({ email });

      const not_exists = !exists || _.isNil(exists);
      if (not_exists) {
        throw new Error(`EmailVerification by email ${email} does not exists`);
      }

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

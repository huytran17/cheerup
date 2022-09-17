import { Request } from "express";
import { IGetEmailVerificationByEmailAndVerificationCode } from "../../../../use-cases/email-verification/get-email-verification-by-email-and-verification-code";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetEmailVerificationByEmailAndVerificationCodeController({
  getEmailVerificationByEmailAndVerificationCode,
  logger,
}: {
  getEmailVerificationByEmailAndVerificationCode: IGetEmailVerificationByEmailAndVerificationCode;
  logger: Logger;
}) {
  return async function getEmailVerificationByEmailAndVerificationCodeController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { email, verification_code } = _.get(
        httpRequest,
        "context.validated"
      );

      const exists = await getEmailVerificationByEmailAndVerificationCode({
        email,
        verification_code,
      });

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

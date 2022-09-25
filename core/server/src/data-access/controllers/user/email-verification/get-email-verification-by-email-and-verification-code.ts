import { Request } from "express";
import { IGetEmailVerificationByEmailAndVerificationCode } from "../../../../use-cases/email-verification/get-email-verification-by-email-and-verification-code";
import _ from "lodash";
import { Logger } from "winston";
import { IGetUserByEmail } from "../../../../use-cases/user/get-user-by-email";

export default function makeGetEmailVerificationByEmailAndVerificationCodeController({
  getUserByEmail,
  getEmailVerificationByEmailAndVerificationCode,
  logger,
}: {
  getUserByEmail: IGetUserByEmail;
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

      const user_exists = await getUserByEmail({
        email,
        is_include_deleted: false,
      });
      const user_not_exists = _.isEmpty(user_exists) || _.isNil(user_exists);
      if (user_not_exists) {
        throw new Error(`User by email ${email} does not exists`);
      }

      const exists = await getEmailVerificationByEmailAndVerificationCode({
        email,
        verification_code,
      });

      const email_verification_not_exists =
        _.isEmpty(exists) || _.isNil(exists);
      if (email_verification_not_exists) {
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

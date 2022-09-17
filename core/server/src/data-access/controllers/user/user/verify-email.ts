import { Request } from "express";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IGetEmailVerificationByEmailAndVerificationCode } from "../../../../use-cases/email-verification/get-email-verification-by-email-and-verification-code";
import { IHardDeleteEmailVerification } from "../../../../use-cases/email-verification/hard-delete-email-verification";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import _ from "lodash";
import Moment from "moment";
import { Logger } from "winston";

export default function makeVerifyEmailController({
  getUser,
  getEmailVerificationByEmailAndVerificationCode,
  updateUser,
  hardDeleteEmailVerification,
  logger,
  moment,
}: {
  getUser: IGetUser;
  getEmailVerificationByEmailAndVerificationCode: IGetEmailVerificationByEmailAndVerificationCode;
  updateUser: IUpdateUser;
  hardDeleteEmailVerification: IHardDeleteEmailVerification;
  logger: Logger;
  moment: typeof Moment;
}) {
  return async function verifyEmailController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { verification_code } = _.get(httpRequest, "context.validated");
      const { _id: user_id, email } = _.get(httpRequest, "context.user");
      const user_exists = await getUser({ _id: user_id });

      const user_not_exists = !user_exists || _.isNil(user_exists);
      if (user_not_exists) {
        throw new Error(`User ${user_id} does not exists`);
      }

      const email_verification =
        await getEmailVerificationByEmailAndVerificationCode({
          email,
          verification_code,
        });

      const email_verification_not_exists =
        !email_verification || _.isNil(email_verification);
      if (email_verification_not_exists) {
        throw new Error(
          `Email verification by email ${email} and code ${verification_code} does not exists`
        );
      }

      const { expire_at: email_verification_expire } = email_verification;

      const is_email_verification_expired = moment(
        email_verification_expire
      ).isBefore(moment());

      if (is_email_verification_expired) {
        throw new Error(
          `Email verification by email ${email} and code ${verification_code} was expired`
        );
      }

      const final_user_details = Object.assign({}, user_exists, {
        email_verified_at: new Date(),
      });

      const verified_user = await updateUser({
        userDetails: final_user_details,
      });

      await hardDeleteEmailVerification({ _id: email_verification._id });

      return {
        headers,
        statusCode: 200,
        body: {
          data: verified_user,
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

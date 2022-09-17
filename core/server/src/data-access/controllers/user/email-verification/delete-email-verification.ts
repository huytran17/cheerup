import { IGetEmailVerification } from "../../../../use-cases/email-verification/get-email-verification";
import { IDeleteEmailVerification } from "../../../../use-cases/email-verification/delete-email-verification";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteEmailVerificationController({
  getEmailVerification,
  deleteEmailVerification,
  logger,
}: {
  getEmailVerification: IGetEmailVerification;
  deleteEmailVerification: IDeleteEmailVerification;
  logger: Logger;
}) {
  return async function deleteEmailVerificationController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getEmailVerification({ _id });

      const not_exists = !exists || _.isNil(exists);
      if (not_exists) {
        throw new Error(`EmailVerification by ${_id} does not exist`);
      }

      const deleted_email_verification = await deleteEmailVerification({ _id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted_email_verification,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

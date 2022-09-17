import { ICreateEmailVerification } from "../../../../use-cases/email-verification/create-email-verification";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeCreateEmailVerificationController({
  createEmailVerification,
  logger,
}: {
  createEmailVerification: ICreateEmailVerification;
  logger: Logger;
}) {
  return async function createEmailVerificationController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const emailVerificationDetails = _.get(httpRequest, "context.validated");

      const created_email_verification = await createEmailVerification({
        emailVerificationDetails,
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
          data: err,
        },
      };
    }
  };
}

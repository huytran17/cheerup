import { Request } from "express";
import { IGetEmailVerification } from "../../../../use-cases/email-verification/get-email-verification";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetEmailVerificationController({
  getEmailVerification,
  logger,
}: {
  getEmailVerification: IGetEmailVerification;
  logger: Logger;
}) {
  return async function getEmailVerificationController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getEmailVerification({ _id: _id });

      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`EmailVerification by id ${_id} does not exists`);
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

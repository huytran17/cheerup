import { Request } from "express";
import { get } from "lodash";
import Moment from "moment";
import { GenerateAccessToken } from "../../../../config/accessTokenManager/generate-access-token";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPasswordResetByCode } from "../../../../use-cases/password-reset/get-password-reset-by-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetPasswordResetByEmailAndCodeController({
  getPasswordResetByCode,
  generateAccessToken,
  moment,
}: {
  getPasswordResetByCode: GetPasswordResetByCode;
  generateAccessToken: GenerateAccessToken;
  moment: typeof Moment;
}) {
  return async function getPasswordResetByEmailAndCodeController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { security_code }: { security_code: string } = get(
        httpRequest,
        "context.validated"
      );

      const exists = await getPasswordResetByCode({
        security_code,
      });

      if (isEmpty(exists)) {
        throw new Error(
          `Password reset by code ${security_code} does not exists`
        );
      }

      const is_expired = moment().isAfter(exists.expire_at);
      if (is_expired) {
        throw new Error(
          `Password reset by code ${security_code} has been expired`
        );
      }

      const verification_token = await generateAccessToken(
        { _id: exists._id },
        { expiresIn: "15m" }
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: { ...exists, verification_token },
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

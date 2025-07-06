import { Request } from "express";
import { get, omit } from "lodash";
import Moment from "moment";
import { GenerateAccessToken } from "../../../../config/access-token-manager/generate-access-token";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPasswordResetByCode } from "../../../../use-cases/password-reset/get-password-reset-by-code";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload {
  security_code: string;
}

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
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { security_code } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getPasswordResetByCode({ security_code });

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
          data: {
            ...omit(exists, ["security_code", "email"]),
            verification_token,
            is_verifying_reset_pwd: true,
          },
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

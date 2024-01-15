import { Request } from "express";
import Moment from "moment";
import { TwoFAType } from "../../../../database/interfaces/two-factor-authentication";
import { GetTwoFactorAuthenticationByEmailAndCode } from "../../../../use-cases/two-factor-authentication/get-two-factor-authentication-by-email-and-code";
import { HardDeleteTwoFactorAuthentication } from "../../../../use-cases/two-factor-authentication/hard-delete-two-factor-authentication";
import { UpdateUser } from "../../../../use-cases/user/update-user";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { tfa } from "../../../../config/tfa";
import { GenerateQRCode } from "../../../../config/qrcode/make-generate-qr-code";
import { isEmpty } from "../../../../utils/is-empty";
import IUser from "../../../../database/interfaces/user";

interface IPayload {
  code: string;
}

export default function makeEnable2FAController({
  updateUser,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
  generateQRCode,
  moment,
}: {
  updateUser: UpdateUser;
  getTwoFactorAuthenticationByEmailAndCode: GetTwoFactorAuthenticationByEmailAndCode;
  hardDeleteTwoFactorAuthentication: HardDeleteTwoFactorAuthentication;
  generateQRCode: GenerateQRCode;
  moment: typeof Moment;
}) {
  return async function enable2FAController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = <IUser>get(httpRequest, "context.user", {});
      const { code } = <IPayload>get(httpRequest, "context.validated", {});

      if (isEmpty(exists)) {
        throw new Error(`User does not exist`);
      }

      const tfa = await getTwoFactorAuthenticationByEmailAndCode({
        email: exists.email,
        code,
        type: TwoFAType.ENABLE,
      });

      if (isEmpty(tfa)) {
        throw new Error(`Invalid two-factor authentication code ${code}`);
      }

      const is_expired = moment().isAfter(moment(tfa.expire_at));
      if (is_expired) {
        await hardDeleteTwoFactorAuthentication({ _id: tfa._id });
        throw new Error(`Two-factor authentication code is expired ${code}`);
      }

      const tfa_secret = exists.tfa_secret || tfa.generateSecret();

      const otp_token = tfa.generateToken({
        email: exists.email,
        service_name: process.env.APP_NAME,
        secret: tfa_secret,
      });

      const qr_uri = await generateQRCode({ otp_auth: otp_token });

      const userDetails = merge({}, exists, {
        is_enabled_2fa: true,
        tfa_secret,
      });

      const [updated_user] = await Promise.all([
        updateUser({
          userDetails,
        }),

        hardDeleteTwoFactorAuthentication({ _id: tfa._id }),
      ]);

      const final_user_data = merge({}, updated_user, {
        qr_uri,
        tfa_secret,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_user_data,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          error: error.message,
        },
      };
    }
  };
}

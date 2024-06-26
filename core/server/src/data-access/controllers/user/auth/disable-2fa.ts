import { Request } from "express";
import { get } from "lodash";
import Moment from "moment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { TwoFAType } from "../../../../database/interfaces/two-factor-authentication";
import IUser from "../../../../database/interfaces/user";
import { GetTwoFactorAuthenticationByEmailAndCode } from "../../../../use-cases/two-factor-authentication/get-two-factor-authentication-by-email-and-code";
import { HardDeleteTwoFactorAuthentication } from "../../../../use-cases/two-factor-authentication/hard-delete-two-factor-authentication";
import { UpdateUser } from "../../../../use-cases/user/update-user";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload {
  code: string;
}

export default function makeDisable2FAController({
  updateUser,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
  moment,
}: {
  updateUser: UpdateUser;
  getTwoFactorAuthenticationByEmailAndCode: GetTwoFactorAuthenticationByEmailAndCode;
  hardDeleteTwoFactorAuthentication: HardDeleteTwoFactorAuthentication;
  moment: typeof Moment;
}) {
  return async function disable2FAController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = <IUser>get(httpRequest, "context.user", {});

      const { code } = <IPayload>get(httpRequest, "context.validated", {});

      const two_fa = await getTwoFactorAuthenticationByEmailAndCode({
        email: exists.email,
        code,
        type: TwoFAType.DISABLE,
      });

      if (isEmpty(two_fa)) {
        throw new Error(`Invalid two-factor authentication code ${code}`);
      }

      const is_expired = moment().isAfter(moment(two_fa.expire_at));
      if (is_expired) {
        await hardDeleteTwoFactorAuthentication({ _id: two_fa._id });
        throw new Error(`Two-factor authentication code is expired ${code}`);
      }

      const user_details = {
        ...exists,
        is_enabled_2fa: false,
        tfa_secret: null,
      };

      const [updated_user] = await Promise.all([
        updateUser(user_details),
        hardDeleteTwoFactorAuthentication({ _id: two_fa._id }),
      ]);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_user,
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

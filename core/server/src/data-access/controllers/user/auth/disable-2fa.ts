import { Request } from "express";
import { get, merge } from "lodash";
import Moment from "moment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { TwoFAType } from "../../../../database/interfaces/two-factor-authentication";
import { GetTwoFactorAuthenticationByEmailAndCode } from "../../../../use-cases/two-factor-authentication/get-two-factor-authentication-by-email-and-code";
import { HardDeleteTwoFactorAuthentication } from "../../../../use-cases/two-factor-authentication/hard-delete-two-factor-authentication";
import { GetUser } from "../../../../use-cases/user/get-user";
import { UpdateUser } from "../../../../use-cases/user/update-user";
import { isEmpty } from "../../../../utils/is-empty";
import IUser from "../../../../database/interfaces/user";

interface IPayload {
  code: string;
}

export default function makeDisable2FAController({
  getUser,
  updateUser,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
  moment,
}: {
  getUser: GetUser;
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
      const { _id } = <IUser>get(httpRequest, "context.user", {});
      const { code } = <IPayload>get(httpRequest, "context.validated", {});

      const user_exists = await getUser({ _id });

      if (isEmpty(user_exists)) {
        throw new Error(`User by id ${_id} does not exist`);
      }

      const two_fa = await getTwoFactorAuthenticationByEmailAndCode({
        email: user_exists.email,
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

      const userDetails = merge({}, user_exists, {
        is_enabled_2fa: false,
        tfa_secret: null,
      });

      const [updated_user] = await Promise.all([
        updateUser({ userDetails }),
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

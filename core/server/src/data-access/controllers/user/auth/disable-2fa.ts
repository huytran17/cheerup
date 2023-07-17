import { Request } from "express";
import Moment from "moment";
import { TwoFAType } from "../../../../database/interfaces/two-factor-authentication";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IGetTwoFactorAuthenticationByEmailAndCode } from "../../../../use-cases/two-factor-authentication/get-two-factor-authentication-by-email-and-code";
import { IHardDeleteTwoFactorAuthentication } from "../../../../use-cases/two-factor-authentication/hard-delete-two-factor-authentication";
import { IUpdateUser } from "../../../../use-cases/user/update-user";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeDisable2FAController({
  getUser,
  updateUser,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
  moment,
}: {
  getUser: IGetUser;
  updateUser: IUpdateUser;
  getTwoFactorAuthenticationByEmailAndCode: IGetTwoFactorAuthenticationByEmailAndCode;
  hardDeleteTwoFactorAuthentication: IHardDeleteTwoFactorAuthentication;
  moment: typeof Moment;
}) {
  return async function disable2FAController(
    httpRequest: Request & { context: { validated: { user_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = get(httpRequest, "context.user");
      const { code } = get(httpRequest, "context.validated");

      const user_exists = await getUser({ _id, is_include_deleted: false });

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

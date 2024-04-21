import { get } from "lodash";
import { GetUser, IGetUserPayload } from "../../../../use-cases/user/get-user";
import { ResetLoginFailedTimes } from "../../../../use-cases/user/reset-login-failed-times";
import { isEmpty } from "../../../../utils/is-empty";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeResetUserLoginFailedTimesController({
  getUser,
  resetLoginFailedTimes,
}: {
  getUser: GetUser;
  resetLoginFailedTimes: ResetLoginFailedTimes;
}) {
  return async function resetUserLoginFailedTimesController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetUserPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getUser({ _id });

      if (isEmpty(exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      await resetLoginFailedTimes({ _id });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: { _id },
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

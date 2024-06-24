import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetAdmin,
  IGetAdminPayload,
} from "../../../../use-cases/admin/get-admin";
import { ResetLoginFailedTimes } from "../../../../use-cases/admin/reset-login-failed-times";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeResetAdminLoginFailedTimesController({
  getAdmin,
  resetLoginFailedTimes,
}: {
  getAdmin: GetAdmin;
  resetLoginFailedTimes: ResetLoginFailedTimes;
}) {
  return async function resetAdminLoginFailedTimesController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetAdminPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getAdmin({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Admin by ${_id} does not exist`);
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

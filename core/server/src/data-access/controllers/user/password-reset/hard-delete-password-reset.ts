import { Request } from "express";
import { GetPasswordReset } from "../../../../use-cases/password-reset/get-password-reset";
import {
  HardDeletePasswordReset,
  IHardDeletePasswordResetPayload,
} from "../../../../use-cases/password-reset/hard-delete-password-reset";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeHardDeletePasswordResetController({
  getPasswordReset,
  hardDeletePasswordReset,
}: {
  getPasswordReset: GetPasswordReset;
  hardDeletePasswordReset: HardDeletePasswordReset;
}) {
  return async function hardDeletePasswordResetController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IHardDeletePasswordResetPayload>(
        get(httpRequest, "context.validated", {})
      );
      const exists = await getPasswordReset({ _id });

      if (isEmpty(exists)) {
        throw new Error(`PasswordReset by id ${_id} does not exists`);
      }

      const deleted = await hardDeletePasswordReset({ _id });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted,
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

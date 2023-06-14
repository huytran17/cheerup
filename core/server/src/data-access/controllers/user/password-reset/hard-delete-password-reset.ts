import { Request } from "express";
import { IGetPasswordReset } from "../../../../use-cases/password-reset/get-password-reset";
import { IHardDeletePasswordReset } from "../../../../use-cases/password-reset/hard-delete-password-reset";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeHardDeletePasswordResetController({
  getPasswordReset,
  hardDeletePasswordReset,
}: {
  getPasswordReset: IGetPasswordReset;
  hardDeletePasswordReset: IHardDeletePasswordReset;
}) {
  return async function hardDeletePasswordResetController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = get(httpRequest, "context.validated");
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

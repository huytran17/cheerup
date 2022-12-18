import { Request } from "express";
import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetMeController({
  getAdmin,
}: {
  getAdmin: IGetAdmin;
}) {
  return async function getMeController(
    httpRequest: Request & { context: { validated: { user_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.user");

      const exists = await getAdmin({ _id });
      if (!exists) {
        throw new Error(`Admin ${_id} does not exist`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          error: error.message,
        },
      };
    }
  };
}

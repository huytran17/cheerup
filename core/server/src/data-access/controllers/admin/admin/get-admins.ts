import { Request } from "express";
import { IGetAdmins } from "../../../../use-cases/admin/get-admins";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetAdminsController({
  getAdmins,
}: {
  getAdmins: IGetAdmins;
}) {
  return async function getAdminsController(
    httpRequest: Request & { context: { validated: { admin_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const admin_id = _.get(httpRequest, "context.validated");
      const exists = await getAdmins();
      if (!exists) {
        throw new Error(`Admin ${admin_id} does not exist`);
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

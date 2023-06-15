import { Request } from "express";
import { IGetAdmins } from "../../../../use-cases/admin/get-admins";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

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
      const admin_id: string = get(httpRequest, "context.validated");

      const exists = await getAdmins();
      if (isEmpty(exists)) {
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

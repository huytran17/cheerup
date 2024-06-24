import { Request } from "express";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetAdmins } from "../../../../use-cases/admin/get-admins";

export default function makeGetAdminsController({
  getAdmins,
}: {
  getAdmins: GetAdmins;
}) {
  return async function getAdminsController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = await getAdmins();

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

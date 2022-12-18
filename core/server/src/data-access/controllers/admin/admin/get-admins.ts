import { Request } from "express";
import { IGetAdmins } from "../../../../use-cases/admin/get-admins";
import _ from "lodash";

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
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500,
        body: {
          error: error.message,
        },
      };
    }
  };
}

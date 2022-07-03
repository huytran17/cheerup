import { Request } from "express";
import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import _ from "lodash";

export default function makeGetAdminController({
  getAdmin,
}: {
  getAdmin: IGetAdmin;
}) {
  return async function getAdminController(
    httpRequest: Request & { context: { validated: { admin_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const admin_id = _.get(httpRequest, "context.validated");
      const exists = await getAdmin({ _id: admin_id });
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
    } catch (err) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500,
        body: {
          error: err.message,
        },
      };
    }
  };
}

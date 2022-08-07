import { Request } from "express";
import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import _ from "lodash";

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

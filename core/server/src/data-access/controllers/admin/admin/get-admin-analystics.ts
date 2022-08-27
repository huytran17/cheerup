import { Request } from "express";
import { IGetAdminAnalystics } from "../../../../use-cases/admin/get-admin-analystics";
import _ from "lodash";

export default function makeGetAdminAnalysticsController({
  getAdminAnalystics,
}: {
  getAdminAnalystics: IGetAdminAnalystics;
}) {
  return async function getAdminAnalysticsController(
    httpRequest: Request & { context: { validated: { admin_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { distance, unit }: { distance?: number; unit?: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const analystics_data = await getAdminAnalystics({ distance, unit });

      return {
        headers,
        statusCode: 200,
        body: {
          data: analystics_data,
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

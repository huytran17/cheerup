import { Request } from "express";
import { IGetAdminAnalystics } from "../../../../use-cases/admin/get-admin-analystics";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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
        statusCode: HttpStatusCode.OK,
        body: {
          data: analystics_data,
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

import { Request } from "express";
import { IGetAdminAnalystics } from "../../../../use-cases/admin/get-admin-analystics";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { AdminType } from "../../../../database/interfaces/admin";

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
      const {
        range,
        unit,
        author_type,
      }: { range?: string; unit?: string; author_type?: AdminType } = _.get(
        httpRequest,
        "context.validated"
      );

      const splitted_range = _.sortBy(_.split(range, ","));

      const analystics_data = await getAdminAnalystics({
        range: splitted_range,
        unit,
        author_type,
      });

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

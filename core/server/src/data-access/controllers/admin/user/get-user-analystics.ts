import { Request } from "express";
import { IGetUserAnalystics } from "../../../../use-cases/user/get-user-analystics";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetUserAnalysticsController({
  getUserAnalystics,
}: {
  getUserAnalystics: IGetUserAnalystics;
}) {
  return async function getUserAnalysticsController(
    httpRequest: Request & { context: { validated: { user_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { range, unit }: { range?: string; unit?: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const splitted_range = _.sortBy(_.split(range, ","));

      const analystics_data = await getUserAnalystics({
        range: splitted_range,
        unit,
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

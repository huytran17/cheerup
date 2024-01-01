import { Request } from "express";
import { GetUserAnalystics } from "../../../../use-cases/user/get-user-analystics";
import { get, sortBy, split } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetUserAnalysticsController({
  getUserAnalystics,
}: {
  getUserAnalystics: GetUserAnalystics;
}) {
  return async function getUserAnalysticsController(
    httpRequest: Request & { context: { validated: { user_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { range, unit }: { range?: string; unit?: string } = get(
        httpRequest,
        "context.validated"
      );

      const splitted_range = sortBy(split(range, ","));

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

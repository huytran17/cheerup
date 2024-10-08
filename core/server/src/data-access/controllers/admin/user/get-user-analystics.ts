import { Request } from "express";
import { get, sortBy, split } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetUserAnalystics,
  IGetUserAnalystics,
} from "../../../../use-cases/user/get-user-analystics";

interface IPayload extends Omit<IGetUserAnalystics, "range"> {
  range?: string;
}

export default function makeGetUserAnalysticsController({
  getUserAnalystics,
}: {
  getUserAnalystics: GetUserAnalystics;
}) {
  return async function getUserAnalysticsController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { range, unit } = <IPayload>(
        get(httpRequest, "context.validated", {})
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

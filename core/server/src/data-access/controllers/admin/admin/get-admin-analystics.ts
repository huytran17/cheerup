import { Request } from "express";
import {
  GetAdminAnalystics,
  IGetAdminAnalysticsPayload,
} from "../../../../use-cases/admin/get-admin-analystics";
import { get, sortBy, split } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

interface IPayload extends Omit<IGetAdminAnalysticsPayload, "range"> {
  range?: string;
}

export default function makeGetAdminAnalysticsController({
  getAdminAnalystics,
}: {
  getAdminAnalystics: GetAdminAnalystics;
}) {
  return async function getAdminAnalysticsController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { range, unit, author_type } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const splitted_range = sortBy(split(range, ","));

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

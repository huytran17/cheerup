import { Request } from "express";
import { get, sortBy, split } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetCategoryAnalystics,
  IGetCategoryAnalystics,
} from "../../../../use-cases/category/get-category-analystics";

interface IPayload extends Omit<IGetCategoryAnalystics, "range"> {
  range?: string;
}

export default function makeGetCategoryAnalysticsController({
  getCategoryAnalystics,
}: {
  getCategoryAnalystics: GetCategoryAnalystics;
}) {
  return async function getCategoryAnalysticsController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { range, unit, limit } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const splitted_range = sortBy(split(range, ","));

      const analystics_data = await getCategoryAnalystics({
        range: splitted_range,
        unit,
        limit,
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

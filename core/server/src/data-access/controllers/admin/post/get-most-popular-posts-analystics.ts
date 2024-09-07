import { Request } from "express";
import { get, sortBy, split } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetMostPopularPostsAnalystics,
  IGetMostPopularPostsAnalystics,
} from "../../../../use-cases/post/get-most-popular-posts-analystics";

interface IPayload extends Omit<IGetMostPopularPostsAnalystics, "range"> {
  range?: string;
}

export default function makeGetMostPopularPostsAnalysticsController({
  getMostPopularPostsAnalystics,
}: {
  getMostPopularPostsAnalystics: GetMostPopularPostsAnalystics;
}) {
  return async function getMostPopularPostsAnalysticsController(
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

      const analystics_data = await getMostPopularPostsAnalystics({
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

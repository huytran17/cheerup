import { Request } from "express";
import { IGetMostPopularPostsAnalystics } from "../../../../use-cases/post/get-most-popular-posts-analystics";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetMostPopularPostsAnalysticsController({
  getMostPopularPostsAnalystics,
}: {
  getMostPopularPostsAnalystics: IGetMostPopularPostsAnalystics;
}) {
  return async function getMostPopularPostsAnalysticsController(
    httpRequest: Request & { context: { validated: { post_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const {
        range,
        unit,
        limit,
      }: { range?: string; unit?: string; limit?: number } = _.get(
        httpRequest,
        "context.validated"
      );

      const splitted_range = _.sortBy(_.split(range, ","));

      const analystics_data = await getMostPopularPostsAnalystics({
        range: splitted_range,
        unit,
        limit,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          analystics_data,
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

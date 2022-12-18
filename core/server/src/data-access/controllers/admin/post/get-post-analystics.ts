import { Request } from "express";
import { IGetPostAnalystics } from "../../../../use-cases/post/get-post-analystics";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetPostAnalysticsController({
  getPostAnalystics,
}: {
  getPostAnalystics: IGetPostAnalystics;
}) {
  return async function getPostAnalysticsController(
    httpRequest: Request & { context: { validated: { post_id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { distance, unit }: { distance?: number; unit?: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const analystics_data = await getPostAnalystics({ distance, unit });

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

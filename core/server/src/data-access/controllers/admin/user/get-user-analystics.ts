import { Request } from "express";
import { IGetUserAnalystics } from "../../../../use-cases/user/get-user-analystics";
import _ from "lodash";

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
      const { distance, unit }: { distance?: number; unit?: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const analystics_data = await getUserAnalystics({ distance, unit });

      return {
        headers,
        statusCode: 200,
        body: {
          data: analystics_data,
        },
      };
    } catch (error) {
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500,
        body: {
          error: error.message,
        },
      };
    }
  };
}

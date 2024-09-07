import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPost } from "../../../../use-cases/post/get-post";
import {
  IIncreasePostViews,
  IncreasePostViews,
} from "../../../../use-cases/post/increase-post-views";

export default function makeIncreasePostViewsController({
  getPost,
  increasePostViews,
}: {
  getPost: GetPost;
  increasePostViews: IncreasePostViews;
}) {
  return async function increasePostViewsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IIncreasePostViews>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getPost({ _id });

      if (!exists) {
        throw new Error(`Post ${_id} does not exist.`);
      }

      const updated = await increasePostViews({ _id });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

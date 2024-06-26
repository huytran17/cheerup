import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import { CountPostBookmarks } from "../../../../use-cases/post-bookmark/count-post-bookmarks";

export default function makeCountPostBookmarkController({
  countPostBookmarks,
}: {
  countPostBookmarks: CountPostBookmarks;
}) {
  return async function countPostBookmarkController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IUser>get(httpRequest, "context.user", {});

      const post_bookmarks_count = await countPostBookmarks({
        user_id: _id,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: post_bookmarks_count,
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

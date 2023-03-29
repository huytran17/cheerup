import { Request } from "express";
import { ICountPostBookmarks } from "../../../../use-cases/post-bookmark/count-post-bookmarks";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCountPostBookmarkController({
  countPostBookmarks,
  getUser,
}: {
  countPostBookmarks: ICountPostBookmarks;
  getUser: IGetUser;
}) {
  return async function countPostBookmarkController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = get(httpRequest, "context.user");

      const user_exists = await getUser({
        _id: user_id,
        is_include_deleted: false,
      });

      if (isEmpty(user_exists)) {
        throw new Error(`User by id ${user_id} does not exists`);
      }

      const post_bookmarks_count = await countPostBookmarks({
        user_id,
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

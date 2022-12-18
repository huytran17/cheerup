import { Request } from "express";
import { ICountPostBookmarks } from "../../../../use-cases/post-bookmark/count-post-bookmarks";
import { IGetUser } from "../../../../use-cases/user/get-user";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeCountPostBookmarkController({
  countPostBookmarks,
  getUser,
  logger,
}: {
  countPostBookmarks: ICountPostBookmarks;
  getUser: IGetUser;
  logger: Logger;
}) {
  return async function countPostBookmarkController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = _.get(httpRequest, "context.user");

      const user_exists = await getUser({
        _id: user_id,
        is_include_deleted: false,
      });

      const user_not_exists = _.isEmpty(user_exists) || _.isNil(user_exists);
      if (user_not_exists) {
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
      return {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

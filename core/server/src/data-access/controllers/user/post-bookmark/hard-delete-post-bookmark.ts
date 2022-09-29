import { IGetPostBookmark } from "../../../../use-cases/post-bookmark/get-post-bookmark";
import { IHardDeletePostBookmark } from "../../../../use-cases/post-bookmark/hard-delete-post-bookmark";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeHardDeletePostBookmarkController({
  getPostBookmark,
  hardDeletePostBookmark,
  logger,
}: {
  getPostBookmark: IGetPostBookmark;
  hardDeletePostBookmark: IHardDeletePostBookmark;
  logger: Logger;
}) {
  return async function hardDeletePostBookmarkController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");

      const exists = await getPostBookmark({ _id });
      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`PostBookmark by id ${_id} does not exist`);
      }

      const hard_deleted_post_bookmark = await hardDeletePostBookmark({ _id });

      return {
        headers,
        statusCode: 200,
        body: {
          data: hard_deleted_post_bookmark,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

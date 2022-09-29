import { ICreatePostBookmark } from "../../../../use-cases/post-bookmark/create-post-bookmark";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeCreatePostBookmarkController({
  createPostBookmark,
  logger,
}: {
  createPostBookmark: ICreatePostBookmark;
  logger: Logger;
}) {
  return async function createPostBookmarkController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const postBookmarkDetails = _.get(httpRequest, "context.validated");

      const post_bookmark_data = await createPostBookmark({
        postBookmarkDetails,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: post_bookmark_data,
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

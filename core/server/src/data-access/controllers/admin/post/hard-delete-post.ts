import { IGetPost } from "../../../../use-cases/post/get-post";
import { IHardDeletePost } from "../../../../use-cases/post/hard-delete-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeHardDeletePostController({
  getPost,
  hardDeletePost,
  logger,
}: {
  getPost: IGetPost;
  hardDeletePost: IHardDeletePost;
  logger: Logger;
}) {
  return async function hardDeletePostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const postDetails = _.get(httpRequest, "context.validated");
      const { _id } = postDetails;
      const exists = await getPost({ _id });
      if (!exists) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const deleted_post = await hardDeletePost({ _id });
      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted_post,
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

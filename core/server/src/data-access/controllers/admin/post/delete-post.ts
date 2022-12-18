import { IGetPost } from "../../../../use-cases/post/get-post";
import { IDeletePost } from "../../../../use-cases/post/delete-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeDeletePostController({
  getPost,
  deletePost,
  logger,
}: {
  getPost: IGetPost;
  deletePost: IDeletePost;
  logger: Logger;
}) {
  return async function deletePostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getPost({ _id });
      if (!exists) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const deleted_post = await deletePost({
        _id,
      });

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

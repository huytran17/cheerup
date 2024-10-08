import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  DeletePost,
  IDeletePost,
} from "../../../../use-cases/post/delete-post";
import { GetPost } from "../../../../use-cases/post/get-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeDeletePostController({
  getPost,
  deletePost,
  logger,
}: {
  getPost: GetPost;
  deletePost: DeletePost;
  logger: Logger;
}) {
  return async function deletePostController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IDeletePost>get(httpRequest, "context.validated", {});

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const deleted_post = await deletePost({ _id });

      logger.verbose(`Deleted post ${deleted_post.title}`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted_post,
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

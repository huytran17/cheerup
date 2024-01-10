import { GetPost, IGetPostPayload } from "../../../../use-cases/post/get-post";
import { UpdatePost } from "../../../../use-cases/post/update-post";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeRestorePostController({
  getPost,
  updatePost,
  logger,
}: {
  getPost: GetPost;
  updatePost: UpdatePost;
  logger: Logger;
}) {
  return async function restorePostController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetPostPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by id ${_id} does not exist`);
      }

      const updated_post_data = merge({}, exists, {
        deleted_at: null,
      });

      const updated_post = await updatePost({
        postDetails: updated_post_data,
      });

      logger.verbose(`Restored post ${exists.title} successfully`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_post,
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

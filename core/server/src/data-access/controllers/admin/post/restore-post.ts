import { IGetPost } from "../../../../use-cases/post/get-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeRestorePostController({
  getPost,
  updatePost,
  logger,
}: {
  getPost: IGetPost;
  updatePost: IUpdatePost;
  logger: Logger;
}) {
  return async function restorePostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getPost({ _id });
      if (!exists) {
        throw new Error(`Post by id ${_id} does not exist`);
      }

      const { _id: user_id } = _.get(httpRequest, "context.user");

      const updated_post_data = Object.assign({}, exists, {
        deleted_at: null,
        last_restored_at: new Date(),
        last_restored_by: user_id,
      });

      const updated_post = await updatePost({
        postDetails: updated_post_data,
      });

      logger.verbose(`Restored post ${_id} successfully`);

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_post,
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

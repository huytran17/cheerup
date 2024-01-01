import { GetPost } from "../../../../use-cases/post/get-post";
import { UpdatePost } from "../../../../use-cases/post/update-post";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUnBlockPostCommentController({
  getPost,
  updatePost,
  logger,
}: {
  getPost: GetPost;
  updatePost: UpdatePost;
  logger: Logger;
}) {
  return async function unBlockPostCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const final_post_details = merge({}, exists, {
        is_blocked_comment: false,
      });

      const updated_post = await updatePost({
        postDetails: final_post_details,
      });

      logger.verbose(`Un-blocked comment for post ${exists.title} `);

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

import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPost, IGetPost } from "../../../../use-cases/post/get-post";
import { UpdatePost } from "../../../../use-cases/post/update-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeBlockPostCommentController({
  getPost,
  updatePost,
  logger,
}: {
  getPost: GetPost;
  updatePost: UpdatePost;
  logger: Logger;
}) {
  return async function blockPostCommentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetPost>get(httpRequest, "context.validated", {});

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const final_post_details = {
        ...exists,
        is_blocked_comment: true,
      };

      const updated_post = await updatePost(final_post_details);

      logger.verbose(`Blocked comment for post ${exists.title}`);

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

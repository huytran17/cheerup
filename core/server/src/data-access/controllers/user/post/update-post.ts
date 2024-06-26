import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPost } from "../../../../use-cases/post/get-post";
import {
  IUpdatePostPayload,
  UpdatePost,
} from "../../../../use-cases/post/update-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdatePostController({
  getPost,
  updatePost,
  logger,
}: {
  getPost: GetPost;
  updatePost: UpdatePost;
  logger: Logger;
}) {
  return async function updatePostController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const post_details = <IUpdatePostPayload>(
        get(httpRequest, "context.validated", {})
      );
      const { _id } = post_details;

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const updated_post = await updatePost(post_details);

      logger.verbose(`Updated post ${exists.title} successfully`);

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

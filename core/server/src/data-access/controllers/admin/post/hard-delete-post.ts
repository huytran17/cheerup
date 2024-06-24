import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPost } from "../../../../use-cases/post/get-post";
import {
  HardDeletePost,
  IHardDeletePayload,
} from "../../../../use-cases/post/hard-delete-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeHardDeletePostController({
  getPost,
  hardDeletePost,
  logger,
}: {
  getPost: GetPost;
  hardDeletePost: HardDeletePost;
  logger: Logger;
}) {
  return async function hardDeletePostController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IHardDeletePayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const deleted_post = await hardDeletePost({ _id });

      logger.verbose(`Hard deleted post ${exists.title}`);

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

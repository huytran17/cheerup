import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetSoftDeletedPost,
  IGetSoftDeletedPostPayload,
} from "../../../../use-cases/post/get-soft-deleted-post";
import { UpdatePost } from "../../../../use-cases/post/update-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeRestorePostController({
  getSoftDeletedPost,
  updatePost,
  logger,
}: {
  getSoftDeletedPost: GetSoftDeletedPost;
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
      const { _id } = <IGetSoftDeletedPostPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getSoftDeletedPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by id ${_id} does not exist`);
      }

      const updated_post = await updatePost({
        ...exists,
        deleted_at: null,
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

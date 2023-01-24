import { IGetPost } from "../../../../use-cases/post/get-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeUnPublishPostController({
  getPost,
  updatePost,
  logger,
}: {
  getPost: IGetPost;
  updatePost: IUpdatePost;
  logger: Logger;
}) {
  return async function unPublishPostController(
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

      const final_post_details = Object.assign({}, exists, {
        is_published: false,
      });

      const updated_post = await updatePost({
        postDetails: final_post_details,
      });
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

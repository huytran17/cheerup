import { IGetPost } from "../../../../use-cases/post/get-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeUpdatePostController({
  getPost,
  updatePost,
  logger,
}: {
  getPost: IGetPost;
  updatePost: IUpdatePost;
  logger: Logger;
}) {
  return async function updatePostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const postDetails = _.get(httpRequest, "context.validated");
      const { _id } = postDetails;
      const exists = await getPost({ _id });
      if (!exists) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const updated_post = await updatePost({ postDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_post,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error,
        },
      };
    }
  };
}

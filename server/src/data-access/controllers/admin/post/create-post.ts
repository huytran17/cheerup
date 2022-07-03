import { ICreatePost } from "../../../../use-cases/post/create-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeCreatePost({
  createPost,
  logger,
}: {
  createPost: ICreatePost;
  logger: Logger;
}) {
  return async function createPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const postDetails = _.get(httpRequest, "context.validated");

      const created_post = await createPost({ postDetails });
      return {
        headers,
        statusCode: 200,
        body: {
          data: created_post,
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

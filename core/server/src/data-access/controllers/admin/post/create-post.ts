import { ICreatePost } from "../../../../use-cases/post/create-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeCreatePostController({
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
      const { _id: user_id } = _.get(httpRequest, "context.user");

      const postDetails = _.get(httpRequest, "context.validated");

      const final_post_details = Object.assign({}, postDetails, {
        author: user_id,
      });

      const created_post = await createPost({
        postDetails: final_post_details,
      });
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

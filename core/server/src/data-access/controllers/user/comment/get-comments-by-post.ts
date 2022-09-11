import { Request } from "express";
import { IGetCommentsByPost } from "../../../../use-cases/comment/get-comments-by-post";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetCommentsByPostController({
  getCommentsByPost,
  logger,
}: {
  getCommentsByPost: IGetCommentsByPost;
  logger: Logger;
}) {
  return async function getCommentsByPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { post_id } = _.get(httpRequest, "context.validated");
      const comments = await getCommentsByPost({ post_id });

      return {
        headers,
        statusCode: 200,
        body: {
          data: comments,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}

import { Request } from "express";
import { IGetCommentsByPost } from "../../../../use-cases/comment/get-comments-by-post";
import { IGetPost } from "../../../../use-cases/post/get-post";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetCommentsByPostController({
  getCommentsByPost,
  getPost,
  logger,
}: {
  getCommentsByPost: IGetCommentsByPost;
  getPost: IGetPost;
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

      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });

      const post_not_exists = _.isEmpty(post_exists) || _.isNil(post_exists);
      if (post_not_exists) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

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

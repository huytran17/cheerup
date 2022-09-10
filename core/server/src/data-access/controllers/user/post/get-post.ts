import { Request } from "express";
import { ICountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import { IGetPost } from "../../../../use-cases/post/get-post";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetPostController({
  getPost,
  countCommentsByPost,
  logger,
}: {
  getPost: IGetPost;
  countCommentsByPost: ICountCommentsByPost;
  logger: Logger;
}) {
  return async function getPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getPost({ _id });
      if (!exists) {
        throw new Error(`Post ${_id} does not exists`);
      }

      const count_post_comment = await countCommentsByPost({ post_id: _id });
      const final_post_data = Object.assign({}, exists, {
        comments_count: count_post_comment,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: final_post_data,
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

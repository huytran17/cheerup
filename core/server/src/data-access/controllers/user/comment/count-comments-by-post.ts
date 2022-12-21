import { Request } from "express";
import { ICountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import { IGetPost } from "../../../../use-cases/post/get-post";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeCountCommentsByPostController({
  countCommentsByPost,
  getPost,
  logger,
}: {
  countCommentsByPost: ICountCommentsByPost;
  getPost: IGetPost;
  logger: Logger;
}) {
  return async function countCommentsByPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const {
        post_id,
      }: {
        post_id: string;
      } = _.get(httpRequest, "context.validated");

      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });

      const post_not_exists = _.isEmpty(post_exists) || _.isNil(post_exists);
      if (post_not_exists) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const data = await countCommentsByPost({ post_id });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data,
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

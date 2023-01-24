import { Request } from "express";
import { IGetPosts } from "../../../../use-cases/post/get-posts";
import { ICountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetPostsController({
  getPosts,
  countCommentsByPost,
  logger,
}: {
  getPosts: IGetPosts;
  countCommentsByPost: ICountCommentsByPost;
  logger: Logger;
}) {
  return async function getPostsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const posts = await getPosts();

      const map_count_comments_promises = posts.map(async (post) => {
        const comments_count = await countCommentsByPost({ post_id: post._id });
        return Object.assign({}, post, {
          comments_count,
        });
      });

      const final_data = await Promise.all(map_count_comments_promises);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_data,
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

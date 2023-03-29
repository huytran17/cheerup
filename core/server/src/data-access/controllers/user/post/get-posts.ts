import { Request } from "express";
import { IGetPosts } from "../../../../use-cases/post/get-posts";
import { ICountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import { map } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetPostsController({
  getPosts,
  countCommentsByPost,
}: {
  getPosts: IGetPosts;
  countCommentsByPost: ICountCommentsByPost;
}) {
  return async function getPostsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const posts = await getPosts();

      const map_count_comments_promises = map(posts, async (post) => {
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

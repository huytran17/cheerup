import { Request } from "express";
import { GetPosts } from "../../../../use-cases/post/get-posts";
import { CountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import { map } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetPostsController({
  getPosts,
  countCommentsByPost,
}: {
  getPosts: GetPosts;
  countCommentsByPost: CountCommentsByPost;
}) {
  return async function getPostsController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const posts = await getPosts();

      const map_count_comments_promises = map(posts, async (post) => {
        const comments_count = await countCommentsByPost({ post_id: post._id });
        return {
          ...post,
          comments_count,
        };
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

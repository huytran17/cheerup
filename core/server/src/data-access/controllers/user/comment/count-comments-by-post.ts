import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  CountCommentsByPost,
  ICountCommentsByPost,
} from "../../../../use-cases/comment/count-comments-by-post";
import { GetPost } from "../../../../use-cases/post/get-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCountCommentsByPostController({
  countCommentsByPost,
  getPost,
}: {
  countCommentsByPost: CountCommentsByPost;
  getPost: GetPost;
}) {
  return async function countCommentsByPostController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { post_id } = <ICountCommentsByPost>(
        get(httpRequest, "context.validated", {})
      );

      const post_exists = await getPost({ _id: post_id });

      if (isEmpty(post_exists)) {
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

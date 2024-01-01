import { GetComment } from "../../../../use-cases/comment/get-comment";
import { HardDeleteComment } from "../../../../use-cases/comment/hard-delete-comment";
import { GetUser } from "../../../../use-cases/user/get-user";
import { GetPost } from "../../../../use-cases/post/get-post";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeDeleteCommentController({
  getComment,
  hardDeleteComment,
  getPost,
  getUser,
}: {
  getComment: GetComment;
  hardDeleteComment: HardDeleteComment;
  getPost: GetPost;
  getUser: GetUser;
}) {
  return async function deleteCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id }: { _id: string } = get(
        httpRequest,
        "context.user"
      );

      const { _id: comment_id }: { _id: string } = get(
        httpRequest,
        "context.validated"
      );

      const exists = await getComment({
        _id: comment_id,
        is_only_parent: false,
      });

      if (isEmpty(exists)) {
        throw new Error(`Comment by ${comment_id} does not exist`);
      }

      const comment_user_id = get(exists, "user._id");
      const user_not_own_comment =
        comment_user_id.toString() !== user_id.toString();

      if (user_not_own_comment) {
        throw new Error(`You have not own this comment`);
      }

      const post_id = get(exists, "post._id");
      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });

      if (isEmpty(post_exists)) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const is_post_blocked_comment = get(
        post_exists,
        "is_blocked_comment",
        false
      );
      if (is_post_blocked_comment) {
        throw new Error(`Post by ${post_id} has been blocked from comments`);
      }

      const user_exists = await getUser({
        _id: user_id,
        is_include_deleted: false,
      });

      if (isEmpty(user_exists)) {
        throw new Error(`User by ${user_id} does not exist`);
      }

      const is_user_blocked_comment = get(
        user_exists,
        "is_blocked_comment",
        false
      );
      if (is_user_blocked_comment) {
        throw new Error(`User by ${user_id} has been blocked from comments`);
      }

      const deleted_comment = await hardDeleteComment({ _id: comment_id });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted_comment,
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

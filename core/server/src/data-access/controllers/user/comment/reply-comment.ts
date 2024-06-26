import { Request } from "express";
import { concat, get, union } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import { GetComment } from "../../../../use-cases/comment/get-comment";
import {
  IReplyCommentPayload,
  ReplyComment,
} from "../../../../use-cases/comment/reply-comment";
import { UpdateComment } from "../../../../use-cases/comment/update-comment";
import { GetPost } from "../../../../use-cases/post/get-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeReplyCommentController({
  replyComment,
  getComment,
  updateComment,
  getPost,
}: {
  replyComment: ReplyComment;
  getComment: GetComment;
  updateComment: UpdateComment;
  getPost: GetPost;
}) {
  return async function replyCommentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const comment_details = <IReplyCommentPayload>(
        get(httpRequest, "context.validated", {})
      );

      const { post: post_id, parent: parent_id } = comment_details;

      const post_exists = await getPost({ _id: post_id });

      if (isEmpty(post_exists)) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const user = <IUser>get(httpRequest, "context.user", {});

      const parent_comment = await getComment({
        _id: parent_id,
        is_only_parent: true,
      });

      const is_post_blocked_comment = get(
        post_exists,
        "is_blocked_comment",
        false
      );
      if (is_post_blocked_comment) {
        throw new Error(`Post by ${post_id} has been blocked from comments`);
      }

      if (user.is_blocked_comment) {
        throw new Error(`User by ${user._id} has been blocked from comments`);
      }

      if (isEmpty(parent_comment)) {
        throw new Error(`Parent comment by ${parent_id} does not exist`);
      }

      const final_comment_data = {
        ...comment_details,
        user,
      };

      const created_reply_comment = await replyComment(final_comment_data);

      const parent_comment_children = get(parent_comment, "children", []);
      const final_parent_comment_data = {
        ...parent_comment,
        children: union(
          concat(parent_comment_children, [get(created_reply_comment, "_id")])
        ),
      };

      await updateComment(final_parent_comment_data);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_reply_comment,
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

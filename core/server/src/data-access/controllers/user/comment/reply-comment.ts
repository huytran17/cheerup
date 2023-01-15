import { IReplyComment } from "../../../../use-cases/comment/reply-comment";
import { IUpdateComment } from "../../../../use-cases/comment/update-comment";
import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeReplyCommentController({
  replyComment,
  getComment,
  updateComment,
  getPost,
  getUser,
  logger,
}: {
  replyComment: IReplyComment;
  getComment: IGetComment;
  updateComment: IUpdateComment;
  getPost: IGetPost;
  getUser: IGetUser;
  logger: Logger;
}) {
  return async function replyCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { user_id } = _.get(httpRequest, "context.user");
      const commentDetails = _.get(httpRequest, "context.validated");

      const { post: post_id, parent: parent_id } = commentDetails;
      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });

      const post_not_exists = _.isEmpty(post_exists) || _.isNil(post_exists);
      if (post_not_exists) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const parent_comment = await getComment({
        _id: parent_id,
        is_only_parent: true,
        is_include_deleted: false,
      });

      const is_post_blocked_comment = _.get(
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
      const user_not_exists = _.isEmpty(user_exists) || _.isNil(user_exists);
      if (user_not_exists) {
        throw new Error(`User by ${user_id} does not exist`);
      }

      const is_user_blocked_comment = _.get(
        user_exists,
        "is_blocked_comment",
        false
      );
      if (is_user_blocked_comment) {
        throw new Error(`User by ${user_id} has been blocked from comments`);
      }

      const parent_not_exists =
        _.isEmpty(parent_comment) || _.isNil(parent_comment);
      if (parent_not_exists) {
        throw new Error(`Parent comment by ${parent_id} does not exist`);
      }

      const final_comment_data = Object.assign({}, commentDetails, {
        user: user_id,
      });

      const created_reply_comment = await replyComment({
        commentDetails: final_comment_data,
      });

      const parent_comment_children = _.get(parent_comment, "children", []);
      const final_parent_comment_data = Object.assign({}, parent_comment, {
        children: _.union(
          _.concat(parent_comment_children, [
            _.get(created_reply_comment, "_id"),
          ])
        ),
      });

      await updateComment({ commentDetails: final_parent_comment_data });

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_reply_comment,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}

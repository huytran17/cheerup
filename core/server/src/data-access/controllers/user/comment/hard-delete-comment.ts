import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IHardDeleteComment } from "../../../../use-cases/comment/hard-delete-comment";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeDeleteCommentController({
  getComment,
  hardDeleteComment,
  getPost,
  getUser,
  logger,
}: {
  getComment: IGetComment;
  hardDeleteComment: IHardDeleteComment;
  getPost: IGetPost;
  getUser: IGetUser;
  logger: Logger;
}) {
  return async function deleteCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = _.get(httpRequest, "context.user");
      const { _id: comment_id } = _.get(httpRequest, "context.validated");

      const exists = await getComment({
        _id: comment_id,
        is_only_parent: false,
        is_include_deleted: false,
      });
      const comment_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (comment_not_exists) {
        throw new Error(`Comment by ${comment_id} does not exist`);
      }

      const comment_user_id = _.get(exists, "user._id");
      const user_not_own_comment =
        comment_user_id.toString() !== user_id.toString();

      if (user_not_own_comment) {
        throw new Error(`You have not own this comment`);
      }

      const post_id = _.get(exists, "post._id");
      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });
      const post_not_exists = _.isEmpty(post_exists) || _.isNil(post_exists);
      if (post_not_exists) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

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

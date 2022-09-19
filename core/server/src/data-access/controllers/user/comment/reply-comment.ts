import { IReplyComment } from "../../../../use-cases/comment/reply-comment";
import { IUpdateComment } from "../../../../use-cases/comment/update-comment";
import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeReplyCommentController({
  replyComment,
  getComment,
  updateComment,
  getPost,
  logger,
}: {
  replyComment: IReplyComment;
  getComment: IGetComment;
  updateComment: IUpdateComment;
  getPost: IGetPost;
  logger: Logger;
}) {
  return async function replyCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const user_id = _.get(httpRequest, "context.user");
      const commentDetails = _.get(httpRequest, "context.validated");

      const { post: post_id, parent: parent_id } = commentDetails;
      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
      });

      const post_not_exists = !post_exists || _.isNil(post_exists);
      if (post_not_exists) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const parent_comment = await getComment({
        _id: parent_id,
        is_only_parent: true,
      });

      const parent_not_exists = !parent_comment || _.isNil(parent_comment);
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
        statusCode: 200,
        body: {
          data: created_reply_comment,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}

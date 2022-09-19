import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IDeleteComment } from "../../../../use-cases/comment/delete-comment";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteCommentController({
  getComment,
  deleteComment,
  getPost,
  logger,
}: {
  getComment: IGetComment;
  deleteComment: IDeleteComment;
  getPost: IGetPost;
  logger: Logger;
}) {
  return async function deleteCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentDetails = _.get(httpRequest, "context.validated");
      const { _id } = commentDetails;
      const exists = await getComment({ _id, is_only_parent: false });
      if (!exists) {
        throw new Error(`Comment by ${_id} does not exist`);
      }

      const post_id = _.get(exists, "post._id");
      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
      });
      const post_not_exists = !post_exists || _.isNil(post_exists);
      if (post_not_exists) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const children_comment = _.get(exists, "children", []);
      const has_chilren = !_.isEmpty(children_comment);

      if (has_chilren) {
        const delete_children_comment_promises = children_comment.map(
          async (child: any) => await deleteComment({ _id: child._id })
        );

        await Promise.all(delete_children_comment_promises);
      }

      const deleted_comment = await deleteComment({ _id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted_comment,
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

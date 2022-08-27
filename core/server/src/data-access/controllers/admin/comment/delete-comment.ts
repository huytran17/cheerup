import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IDeleteComment } from "../../../../use-cases/comment/delete-comment";
import { IGetCommentsByParent } from "../../../../use-cases/comment/get-comments-by-parent";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDeleteComment({
  getComment,
  deleteComment,
  getCommentsByParent,
  logger,
}: {
  getComment: IGetComment;
  deleteComment: IDeleteComment;
  getCommentsByParent: IGetCommentsByParent;
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
      const exists = await getComment({ _id });
      if (!exists) {
        throw new Error(`Comment by ${_id} does not exist`);
      }

      const child_comments = await getCommentsByParent({ parent_id: _id });
      const delete_child_comments_promises = child_comments.map(
        async (comment) => await deleteComment({ _id: comment._id })
      );

      await Promise.all([
        delete_child_comments_promises,
        deleteComment({ _id }),
      ]);

      logger.verbose(`Deleted comment by ${_id} and its children successfully`);

      return {
        headers,
        statusCode: 200,
        body: {
          data: null,
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

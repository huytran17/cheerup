import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface IUpdateComment extends Partial<IComment> {}

export type UpdateComment = (payload: IUpdateComment) => Promise<IComment>;

export default function makeUpdateComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): UpdateComment {
  return async function updateComment(payload) {
    return await commentDb.update(payload);
  };
}

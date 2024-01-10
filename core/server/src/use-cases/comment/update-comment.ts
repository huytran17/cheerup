import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface IUpdateCommentData extends Partial<IComment> {}

interface IUpdateComment {
  commentDetails: IUpdateCommentData;
}

export type UpdateComment = ({
  commentDetails,
}: IUpdateComment) => Promise<IComment>;

export default function makeUpdateComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): UpdateComment {
  return async function updateComment({ commentDetails }) {
    return await commentDb.update(commentDetails);
  };
}

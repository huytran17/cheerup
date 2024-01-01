import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface IUpdateCommentData {
  commentDetails: Omit<IComment, "_id">;
}

export type IUpdateComment = ({
  commentDetails,
}: IUpdateCommentData) => Promise<IComment>;

export default function makeUpdateComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IUpdateComment {
  return async function updateComment({ commentDetails }) {
    return await commentDb.update(commentDetails);
  };
}

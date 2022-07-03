import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface IUpdateCommentData {
  commentDetails: Omit<IComment, "_id">;
}

export type IUpdateComment = ({
  commentDetails,
}: IUpdateCommentData) => Promise<Comment | null>;

export default function makeUpdateComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IUpdateComment {
  return async function updateComment({
    commentDetails,
  }: IUpdateCommentData): Promise<Comment | null> {
    const comment = await commentDb.update(commentDetails);
    return comment;
  };
}

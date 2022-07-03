import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface ICreateCommentData {
  commentDetails: Omit<IComment, "_id">;
}

export type ICreateComment = ({
  commentDetails,
}: ICreateCommentData) => Promise<Comment | null>;

export default function makeCreateComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): ICreateComment {
  return async function updateComment({
    commentDetails,
  }: ICreateCommentData): Promise<Comment | null> {
    const comment = await commentDb.insert(commentDetails);
    return comment;
  };
}

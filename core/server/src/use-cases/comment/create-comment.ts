import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface ICreateCommentData {
  commentDetails: Omit<IComment, "_id">;
}

export type ICreateComment = ({
  commentDetails,
}: ICreateCommentData) => Promise<IComment>;

export default function makeCreateComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): ICreateComment {
  return async function createComment({ commentDetails }) {
    return await commentDb.insert(commentDetails);
  };
}

import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IGetComments = () => Promise<Comment[] | null>;

export default function makeGetComments({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IGetComments {
  return async function getComments() {
    return await commentDb.findAll();
  };
}

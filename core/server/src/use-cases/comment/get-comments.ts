import IComment from "../../database/interfaces/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type GetComments = () => Promise<IComment[]>;

export default function makeGetComments({
  commentDb,
}: {
  commentDb: ICommentDb;
}): GetComments {
  return async function getComments() {
    return await commentDb.findAll();
  };
}

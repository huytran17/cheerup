import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IGetCommentsByParent = ({
  parent_id,
}: {
  parent_id: string;
}) => Promise<Comment[] | null>;

export default function makeGetCommentsByParent({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IGetCommentsByParent {
  return async function getCommentsByParent({ parent_id }) {
    return await commentDb.findAllByParent({ parent_id });
  };
}

import IComment from "../../database/interfaces/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type GetCommentsByParent = ({
  parent_id,
}: {
  parent_id: string;
}) => Promise<IComment[]>;

export default function makeGetCommentsByParent({
  commentDb,
}: {
  commentDb: ICommentDb;
}): GetCommentsByParent {
  return async function getCommentsByParent({ parent_id }) {
    return await commentDb.findAllByParent({ parent_id });
  };
}

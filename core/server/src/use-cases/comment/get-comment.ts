import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IGetComment = ({
  _id,
  is_only_parent,
  is_show_children,
}: {
  _id: string;
  is_only_parent?: boolean;
  is_show_children?: boolean;
}) => Promise<Comment | null>;

export default function makeGetComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IGetComment {
  return async function getComment({ _id, is_only_parent, is_show_children }) {
    return await commentDb.findById({
      _id,
      is_only_parent,
      is_show_children,
    });
  };
}

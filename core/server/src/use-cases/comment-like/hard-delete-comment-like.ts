import ICommentLike from "../../database/interfaces/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";

export interface IHardDeleteCommentLikePayload {
  _id: string;
}

export type HardDeleteCommentLike = ({
  _id,
}: IHardDeleteCommentLikePayload) => Promise<ICommentLike>;

export default function makeHardDeleteCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): HardDeleteCommentLike {
  return async function hardDeleteCommentLike({ _id }) {
    return await commentLikeDb.hardDelete({ _id });
  };
}

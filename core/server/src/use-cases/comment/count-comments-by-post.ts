import ICommentDb from "../../data-access/interfaces/comment-db";

export interface ICountCommentsByPostPayload {
  post_id: string;
}

export type CountCommentsByPost = ({
  post_id,
}: ICountCommentsByPostPayload) => Promise<number>;

export default function makeCountCommentsByPost({
  commentDb,
}: {
  commentDb: ICommentDb;
}): CountCommentsByPost {
  return async function countCommentsByPost({ post_id }) {
    return await commentDb.countByPost({ post_id });
  };
}

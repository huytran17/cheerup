import IPostBookmark from "../../database/interfaces/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export interface IGetPostBookmarkByUserAndPostPayload {
  user_id: string;
  post_id: string;
}

export type GetPostBookmarkByUserAndPost = ({
  user_id,
  post_id,
}: IGetPostBookmarkByUserAndPostPayload) => Promise<IPostBookmark>;

export default function makeGetPostBookmarkByUserAndPost({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): GetPostBookmarkByUserAndPost {
  return async function getPostBookmarkByUserAndPost({ user_id, post_id }) {
    return await postBookmarkDb.findByUserAndPost({
      user_id,
      post_id,
    });
  };
}

import PostBookmark from "../../database/entities/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export type IGetPostBookmarkByUserAndPost = ({
  user_id,
  post_id,
}: {
  user_id: string;
  post_id: string;
}) => Promise<PostBookmark>;

export default function makeGetPostBookmarkByUserAndPost({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): IGetPostBookmarkByUserAndPost {
  return async function getPostBookmarkByUserAndPost({ user_id, post_id }) {
    return await postBookmarkDb.findByUserAndPost({
      user_id,
      post_id,
    });
  };
}

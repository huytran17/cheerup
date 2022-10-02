import PostBookmark from "../../database/entities/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";
import IPostBookmark from "../../database/interfaces/post-bookmark";

export interface ICountPostBookmarksData {
  user_id: string;
}

export type ICountPostBookmarks = ({
  user_id,
}: ICountPostBookmarksData) => Promise<number>;

export default function makeCountPostBookmarks({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): ICountPostBookmarks {
  return async function countPostBookmarks({
    user_id,
  }: ICountPostBookmarksData): Promise<number> {
    const post_bookmark_count = await postBookmarkDb.countPostBookmarks({
      user_id,
    });
    return post_bookmark_count || 0;
  };
}

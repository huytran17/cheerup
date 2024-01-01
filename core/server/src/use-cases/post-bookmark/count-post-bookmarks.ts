import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export interface ICountPostBookmarksData {
  user_id: string;
}

export type CountPostBookmarks = ({
  user_id,
}: ICountPostBookmarksData) => Promise<number>;

export default function makeCountPostBookmarks({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): CountPostBookmarks {
  return async function countPostBookmarks({ user_id }) {
    return await postBookmarkDb.countPostBookmarks({ user_id });
  };
}

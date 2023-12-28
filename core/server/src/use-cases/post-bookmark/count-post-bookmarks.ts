import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

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
  return async function countPostBookmarks({ user_id }): Promise<number> {
    return await postBookmarkDb.countPostBookmarks({ user_id });
  };
}

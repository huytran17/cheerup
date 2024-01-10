import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export interface ICountPostBookmarksPayload {
  user_id: string;
}

export type CountPostBookmarks = ({
  user_id,
}: ICountPostBookmarksPayload) => Promise<number>;

export default function makeCountPostBookmarks({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): CountPostBookmarks {
  return async function countPostBookmarks({ user_id }) {
    return await postBookmarkDb.countPostBookmarks({ user_id });
  };
}

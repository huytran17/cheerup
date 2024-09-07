import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export interface ICountPostBookmarks {
  user_id: string;
}

export type CountPostBookmarks = ({
  user_id,
}: ICountPostBookmarks) => Promise<number>;

export default function makeCountPostBookmarks({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): CountPostBookmarks {
  return async function countPostBookmarks({ user_id }) {
    return await postBookmarkDb.countPostBookmarks({ user_id });
  };
}

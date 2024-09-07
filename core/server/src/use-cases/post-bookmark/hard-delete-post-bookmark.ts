import IPostBookmark from "../../database/interfaces/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export interface IHardDeletePostBookmark {
  _id: string;
}

export type HardDeletePostBookmark = ({
  _id,
}: IHardDeletePostBookmark) => Promise<IPostBookmark>;

export default function makeHardDeletePostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): HardDeletePostBookmark {
  return async function hardDeletePostBookmark({ _id }) {
    return await postBookmarkDb.hardDelete({ _id });
  };
}

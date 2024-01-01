import IPostBookmark from "../../database/interfaces/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export type IHardDeletePostBookmark = ({
  _id,
}: {
  _id: string;
}) => Promise<IPostBookmark>;

export default function makeHardDeletePostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): IHardDeletePostBookmark {
  return async function hardDeletePostBookmark({ _id }) {
    return await postBookmarkDb.hardDelete({ _id });
  };
}

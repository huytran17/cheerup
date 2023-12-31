import PostBookmark from "../../database/entities/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export type IHardDeletePostBookmark = ({
  _id,
}: {
  _id: string;
}) => Promise<PostBookmark>;

export default function makeHardDeletePostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): IHardDeletePostBookmark {
  return async function hardDeletePostBookmark({ _id }) {
    return await postBookmarkDb.hardDelete({ _id });
  };
}

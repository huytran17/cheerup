import PostBookmark from "../../database/entities/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export type IHardDeletePostBookmark = ({
  _id,
}: {
  _id: string;
}) => Promise<PostBookmark | null>;

export default function makeHardDeletePostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): IHardDeletePostBookmark {
  return async function hardDeletePostBookmark({
    _id,
  }: {
    _id: string;
  }): Promise<PostBookmark | null> {
    const post_bookmark = await postBookmarkDb.hardDelete({ _id });
    return post_bookmark;
  };
}

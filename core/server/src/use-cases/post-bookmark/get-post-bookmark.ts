import PostBookmark from "../../database/entities/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export type IGetPostBookmark = ({
  _id,
}: {
  _id: string;
}) => Promise<PostBookmark | null>;

export default function makeGetPostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): IGetPostBookmark {
  return async function getPostBookmark({ _id }) {
    return await postBookmarkDb.findById({ _id });
  };
}

import IPostBookmark from "../../database/interfaces/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export type IGetPostBookmark = ({
  _id,
}: {
  _id: string;
}) => Promise<IPostBookmark>;

export default function makeGetPostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): IGetPostBookmark {
  return async function getPostBookmark({ _id }) {
    return await postBookmarkDb.findById({ _id });
  };
}

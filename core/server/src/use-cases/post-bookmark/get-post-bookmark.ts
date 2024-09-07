import IPostBookmark from "../../database/interfaces/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";

export interface IGetPostBookmark {
  _id: string;
}

export type GetPostBookmark = ({
  _id,
}: IGetPostBookmark) => Promise<IPostBookmark>;

export default function makeGetPostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): GetPostBookmark {
  return async function getPostBookmark({ _id }) {
    return await postBookmarkDb.findById({ _id });
  };
}

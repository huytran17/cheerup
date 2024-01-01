import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";
import IPostBookmark from "../../database/interfaces/post-bookmark";

export interface ICreatePostBookmarkData {
  postBookmarkDetails: Omit<IPostBookmark, "_id" | "created_at" | "updated_at">;
}

export type ICreatePostBookmark = ({
  postBookmarkDetails,
}: ICreatePostBookmarkData) => Promise<IPostBookmark>;

export default function makeCreatePostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): ICreatePostBookmark {
  return async function createPostBookmark({ postBookmarkDetails }) {
    return await postBookmarkDb.insert(postBookmarkDetails);
  };
}

import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";
import IPostBookmark from "../../database/interfaces/post-bookmark";

export interface ICreatePostBookmarkData {
  postBookmarkDetails: Omit<IPostBookmark, "_id" | "created_at" | "updated_at">;
}

export type CreatePostBookmark = ({
  postBookmarkDetails,
}: ICreatePostBookmarkData) => Promise<IPostBookmark>;

export default function makeCreatePostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): CreatePostBookmark {
  return async function createPostBookmark({ postBookmarkDetails }) {
    return await postBookmarkDb.insert(postBookmarkDetails);
  };
}

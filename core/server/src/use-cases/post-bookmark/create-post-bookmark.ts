import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";
import IPostBookmark from "../../database/interfaces/post-bookmark";

export interface ICreatePostBookmark extends Partial<IPostBookmark> {
  [key: string]: any;
}

export type CreatePostBookmark = (
  payload: ICreatePostBookmark
) => Promise<IPostBookmark>;

export default function makeCreatePostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): CreatePostBookmark {
  return async function createPostBookmark(payload) {
    return await postBookmarkDb.insert(payload);
  };
}

import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";
import IPostBookmark from "../../database/interfaces/post-bookmark";

export interface ICreatePostBookmarkPayload extends Partial<IPostBookmark> {
  [key: string]: any;
}

export interface ICreatePostBookmark {
  postBookmarkDetails: ICreatePostBookmarkPayload;
}

export type CreatePostBookmark = ({
  postBookmarkDetails,
}: ICreatePostBookmark) => Promise<IPostBookmark>;

export default function makeCreatePostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): CreatePostBookmark {
  return async function createPostBookmark({ postBookmarkDetails }) {
    return await postBookmarkDb.insert(postBookmarkDetails);
  };
}

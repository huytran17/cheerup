import PostBookmark from "../../database/entities/post-bookmark";
import IPostBookmarkDb from "../../data-access/interfaces/post-bookmark-db";
import IPostBookmark from "../../database/interfaces/post-bookmark";

export interface ICreatePostBookmarkData {
  postBookmarkDetails: Omit<IPostBookmark, "_id">;
}

export type ICreatePostBookmark = ({
  postBookmarkDetails,
}: ICreatePostBookmarkData) => Promise<PostBookmark | null>;

export default function makeCreatePostBookmark({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): ICreatePostBookmark {
  return async function createPostBookmark({
    postBookmarkDetails,
  }: ICreatePostBookmarkData): Promise<PostBookmark | null> {
    const subscription = await postBookmarkDb.insert(postBookmarkDetails);
    return subscription;
  };
}

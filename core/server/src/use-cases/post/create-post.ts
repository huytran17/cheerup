import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export interface ICreatePostPayload extends Partial<IPost> {}

export type CreatePost = (payload: ICreatePostPayload) => Promise<IPost>;

export default function makeCreatePost({
  postDb,
}: {
  postDb: IPostDb;
}): CreatePost {
  return async function createPost(payload) {
    return await postDb.insert(payload);
  };
}

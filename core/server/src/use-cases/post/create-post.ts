import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export interface ICreatePostPayload extends Partial<IPost> {}

interface ICreatePost {
  postDetails: ICreatePostPayload;
}

export type CreatePost = ({ postDetails }: ICreatePost) => Promise<IPost>;

export default function makeCreatePost({
  postDb,
}: {
  postDb: IPostDb;
}): CreatePost {
  return async function createPost({ postDetails }) {
    return await postDb.insert(postDetails);
  };
}

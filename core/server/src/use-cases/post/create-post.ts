import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export interface ICreatePostData {
  postDetails: Omit<IPost, "_id">;
}

export type CreatePost = ({ postDetails }: ICreatePostData) => Promise<IPost>;

export default function makeCreatePost({
  postDb,
}: {
  postDb: IPostDb;
}): CreatePost {
  return async function createPost({ postDetails }) {
    return await postDb.insert(postDetails);
  };
}

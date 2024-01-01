import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export interface IUpdatePostData {
  postDetails: Omit<IPost, "_id">;
}

export type UpdatePost = ({ postDetails }: IUpdatePostData) => Promise<IPost>;

export default function makeUpdatePost({
  postDb,
}: {
  postDb: IPostDb;
}): UpdatePost {
  return async function updatePost({ postDetails }) {
    return await postDb.update(postDetails);
  };
}

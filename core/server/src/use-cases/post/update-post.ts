import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export interface IUpdatePostPayload extends Partial<IPost> {}

interface IUpdatePost {
  postDetails: IUpdatePostPayload;
}

export type UpdatePost = ({ postDetails }: IUpdatePost) => Promise<IPost>;

export default function makeUpdatePost({
  postDb,
}: {
  postDb: IPostDb;
}): UpdatePost {
  return async function updatePost({ postDetails }) {
    return await postDb.update(postDetails);
  };
}

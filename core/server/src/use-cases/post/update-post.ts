import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export interface IUpdatePostPayload extends Partial<IPost> {}

export type UpdatePost = (payload: IUpdatePostPayload) => Promise<IPost>;

export default function makeUpdatePost({
  postDb,
}: {
  postDb: IPostDb;
}): UpdatePost {
  return async function updatePost(payload) {
    return await postDb.update(payload);
  };
}

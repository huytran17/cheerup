import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export interface IBatchUploadPosts extends Partial<IPost> {
  [key: string]: any;
}

export type BatchUploadPosts = (
  payload: IBatchUploadPosts[]
) => Promise<IPost[]>;

export default function makeBatchUploadPosts({
  postDb,
}: {
  postDb: IPostDb;
}): BatchUploadPosts {
  return async function batchUploadPosts(payload) {
    return await postDb.insertMany(payload);
  };
}

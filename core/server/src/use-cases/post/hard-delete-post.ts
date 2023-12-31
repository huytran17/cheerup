import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IHardDeletePost = ({ _id }: { _id: string }) => Promise<Post>;

export default function makeHardDeletePost({
  postDb,
}: {
  postDb: IPostDb;
}): IHardDeletePost {
  return async function hardDeletePost({ _id }) {
    return await postDb.hardDelete({ _id });
  };
}

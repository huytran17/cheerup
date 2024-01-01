import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type DeletePost = ({ _id }: { _id: string }) => Promise<IPost>;

export default function makeDeletePost({
  postDb,
}: {
  postDb: IPostDb;
}): DeletePost {
  return async function deletePost({ _id }) {
    return await postDb.delete({ _id });
  };
}

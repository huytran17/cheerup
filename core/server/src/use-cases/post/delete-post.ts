import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export interface IDeletePost {
  _id: string;
}

export type DeletePost = ({ _id }: IDeletePost) => Promise<IPost>;

export default function makeDeletePost({
  postDb,
}: {
  postDb: IPostDb;
}): DeletePost {
  return async function deletePost({ _id }) {
    return await postDb.delete({ _id });
  };
}

import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IDeletePost = ({
  _id,
  last_deleted_by,
}: {
  _id: string;
  last_deleted_by: string;
}) => Promise<Post | null>;

export default function makeDeletePost({
  postDb,
}: {
  postDb: IPostDb;
}): IDeletePost {
  return async function deletePost({
    _id,
    last_deleted_by,
  }: {
    _id: string;
    last_deleted_by: string;
  }): Promise<Post | null> {
    const post = await postDb.delete({ _id, last_deleted_by });
    return post;
  };
}

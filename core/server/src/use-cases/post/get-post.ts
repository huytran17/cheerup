import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetPost = ({
  _id,
  is_only_published,
  is_include_deleted,
}: {
  _id: string;
  is_only_published?: boolean;
  is_include_deleted?: boolean;
}) => Promise<Post | null>;

export default function makeGetPost({ postDb }: { postDb: IPostDb }): IGetPost {
  return async function getPost({
    _id,
    is_only_published,
    is_include_deleted,
  }) {
    return await postDb.findById({
      _id,
      is_only_published,
      is_include_deleted,
    });
  };
}

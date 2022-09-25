import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";
import { Logger } from "winston";

export type IGetPost = ({
  _id,
  is_only_published,
  is_include_deleted,
}: {
  _id: string;
  is_only_published?: boolean;
  is_include_deleted?: boolean;
}) => Promise<Post | null>;

export default function makeGetPost({
  postDb,
  logger,
}: {
  postDb: IPostDb;
  logger: Logger;
}): IGetPost {
  return async function getPost({
    _id,
    is_only_published,
    is_include_deleted,
  }: {
    _id: string;
    is_only_published?: boolean;
    is_include_deleted?: boolean;
  }): Promise<Post | null> {
    const post = await postDb.findById({
      _id,
      is_only_published,
      is_include_deleted,
    });
    return post;
  };
}

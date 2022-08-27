import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";
import { Logger } from "winston";

export type IGetPost = ({ _id }: { _id: string }) => Promise<Post | null>;

export default function makeGetPost({
  postDb,
  logger,
}: {
  postDb: IPostDb;
  logger: Logger;
}): IGetPost {
  return async function getPost({
    _id,
  }: {
    _id: string;
  }): Promise<Post | null> {
    const post = await postDb.findById({ _id });
    return post;
  };
}

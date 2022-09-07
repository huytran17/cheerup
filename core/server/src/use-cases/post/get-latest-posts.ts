import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";
import { Logger } from "winston";

export type IGetLatestPosts = ({
  amount,
}: {
  amount: number;
}) => Promise<Post[]>;

export default function makeGetLatestPosts({
  postDb,
  logger,
}: {
  postDb: IPostDb;
  logger: Logger;
}): IGetLatestPosts {
  return async function getLatestPosts({
    amount,
  }: {
    amount: number;
  }): Promise<Post[]> {
    const posts = await postDb.findLatest({ amount });
    return posts;
  };
}

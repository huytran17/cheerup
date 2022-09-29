import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";
import { Logger } from "winston";

export type IGetSuggestionPosts = ({
  amount,
  categories,
  exclude_ids,
}: {
  amount: number;
  categories: string[];
  exclude_ids?: string[];
}) => Promise<Post[]>;

export default function makeGetSuggestionPosts({
  postDb,
  logger,
}: {
  postDb: IPostDb;
  logger: Logger;
}): IGetSuggestionPosts {
  return async function getSuggestionPosts({
    amount,
    categories,
    exclude_ids,
  }: {
    amount: number;
    categories: string[];
    exclude_ids?: string[];
  }): Promise<Post[]> {
    const posts = await postDb.findSuggestionPosts({
      amount,
      categories,
      exclude_ids,
    });
    return posts;
  };
}

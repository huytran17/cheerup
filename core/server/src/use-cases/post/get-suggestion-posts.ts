import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";
import { Logger } from "winston";

export type IGetSuggestionPosts = ({
  amount,
  categories,
  is_only_published,
}: {
  amount: number;
  categories: string[];
  is_only_published?: boolean;
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
    is_only_published,
  }: {
    amount: number;
    categories: string[];
    is_only_published?: boolean;
  }): Promise<Post[]> {
    const posts = await postDb.findSuggestionPosts({
      amount,
      categories,
      is_only_published,
    });
    return posts;
  };
}

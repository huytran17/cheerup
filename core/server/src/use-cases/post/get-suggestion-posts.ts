import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

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
}: {
  postDb: IPostDb;
}): IGetSuggestionPosts {
  return async function getSuggestionPosts({
    amount,
    categories,
    exclude_ids,
  }): Promise<Post[]> {
    return await postDb.findSuggestionPosts({
      amount,
      categories,
      exclude_ids,
    });
  };
}

import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetSuggestionPosts = ({
  amount,
  categories,
  exclude_ids,
}: {
  amount: number;
  categories: string[];
  exclude_ids?: string[];
}) => Promise<IPost[]>;

export default function makeGetSuggestionPosts({
  postDb,
}: {
  postDb: IPostDb;
}): IGetSuggestionPosts {
  return async function getSuggestionPosts({
    amount,
    categories,
    exclude_ids,
  }) {
    return await postDb.findSuggestionPosts({
      amount,
      categories,
      exclude_ids,
    });
  };
}

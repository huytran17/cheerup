import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export interface IGetSuggestionPostsPayload {
  amount: number;
  categories: string[];
  exclude_ids?: string[];
}

export type GetSuggestionPosts = ({
  amount,
  categories,
  exclude_ids,
}: IGetSuggestionPostsPayload) => Promise<IPost[]>;

export default function makeGetSuggestionPosts({
  postDb,
}: {
  postDb: IPostDb;
}): GetSuggestionPosts {
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

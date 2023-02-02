import Comment from "../../database/entities/comment";
import ICommentDb, {
  PaginatedCommentResult,
} from "../../data-access/interfaces/comment-db";
import { Logger } from "winston";

export type IGetCommentsByPostPaginated = (
  {
    post_id,
  }: {
    post_id: string;
  },
  {
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page: number;
  }
) => Promise<PaginatedCommentResult | null>;

export default function makeGetCommentsByPostPaginated({
  commentDb,
  logger,
}: {
  commentDb: ICommentDb;
  logger: Logger;
}): IGetCommentsByPostPaginated {
  return async function getCommentsByPostPaginated(
    {
      post_id,
    }: {
      post_id: string;
    },
    {
      query,
      page,
      entries_per_page,
    }: {
      query: string;
      page: number;
      entries_per_page: number;
    }
  ): Promise<PaginatedCommentResult | null> {
    const data = await commentDb.findAllByPostPaginated(
      { post_id },
      {
        query,
        page,
        entries_per_page,
      }
    );
    return data;
  };
}

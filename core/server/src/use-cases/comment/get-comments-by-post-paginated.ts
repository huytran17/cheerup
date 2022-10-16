import Comment from "../../database/entities/comment";
import ICommentDb, {
  PaginatedCommentResult,
} from "../../data-access/interfaces/comment-db";
import { Logger } from "winston";

export type IGetCommentsByPostPaginated = (
  {
    post_id,
    is_include_deleted,
  }: {
    post_id: string;
    is_include_deleted?: boolean;
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
      is_include_deleted = true,
    }: {
      post_id: string;
      is_include_deleted?: boolean;
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
    const data = await commentDb.findAllByPost(
      { post_id, is_include_deleted },
      {
        query,
        page,
        entries_per_page,
      }
    );
    return data;
  };
}

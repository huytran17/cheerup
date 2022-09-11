import Comment from "../../database/entities/comment";
import IComment from "../../database/interfaces/comment";
export default interface ICommentDb {
  findAll: () => Promise<Comment[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedCommentResult | null>;
  findOne: () => Promise<Comment | null>;
  findById: ({ _id }: { _id: string }) => Promise<Comment | null>;
  findAllByPost: ({
    post_id,
  }: {
    post_id: string;
  }) => Promise<Comment[] | null>;
  countByPost: ({ post_id }: { post_id: string }) => Promise<number | null>;
  findAllByParent: ({
    parent_id,
  }: {
    parent_id: string;
  }) => Promise<Comment[] | null>;
  insert: (payload: Partial<IComment>) => Promise<Comment | null>;
  delete: ({ _id }: { _id: string }) => Promise<Comment | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Comment | null>;
  update: (updatePayload: Partial<IComment>) => Promise<Comment | null>;
}

export interface PaginatedCommentResult {
  data: Comment[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

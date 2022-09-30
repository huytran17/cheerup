import PostBookmark from "../../database/entities/post-bookmark";
import IPostBookmark from "../../database/interfaces/post-bookmark";
export default interface IPostBookmarkDb {
  findAll: () => Promise<PostBookmark[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedPostBookmarkResult | null>;
  findOne: () => Promise<PostBookmark | null>;
  findById: ({ _id }: { _id: string }) => Promise<PostBookmark | null>;
  findByUserAndPost: ({
    user_id,
    post_id,
  }: {
    user_id: string;
    post_id: string;
  }) => Promise<PostBookmark | null>;
  insert: (payload: Partial<IPostBookmark>) => Promise<PostBookmark | null>;
  delete: ({ _id }: { _id: string }) => Promise<PostBookmark | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<PostBookmark | null>;
  update: (
    updatePayload: Partial<IPostBookmark>
  ) => Promise<PostBookmark | null>;
}

export interface PaginatedPostBookmarkResult {
  data: PostBookmark[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

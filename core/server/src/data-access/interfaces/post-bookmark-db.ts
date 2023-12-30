import PostBookmark from "../../database/entities/post-bookmark";
import IPostBookmark from "../../database/interfaces/post-bookmark";
export default interface IPostBookmarkDb {
  findAll: () => Promise<PostBookmark[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
    user_id,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
    user_id?: string;
  }) => Promise<IPaginatedPostBookmarkResult>;
  findOne: () => Promise<PostBookmark>;
  findById: ({ _id }: { _id: string }) => Promise<PostBookmark>;
  countPostBookmarks: ({ user_id }: { user_id: string }) => Promise<number>;
  findByUserAndPost: ({
    user_id,
    post_id,
  }: {
    user_id: string;
    post_id: string;
  }) => Promise<PostBookmark>;
  insert: (payload: Partial<IPostBookmark>) => Promise<PostBookmark>;
  delete: ({ _id }: { _id: string }) => Promise<PostBookmark>;
  hardDelete: ({ _id }: { _id: string }) => Promise<PostBookmark>;
  update: (updatePayload: Partial<IPostBookmark>) => Promise<PostBookmark>;
}

export interface IPaginatedPostBookmarkResult {
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

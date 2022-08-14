import Post from "../../database/entities/post";
import IPost from "../../database/interfaces/post";
export default interface IPostDb {
  findAll: () => Promise<Post[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedPostResult | null>;
  findOne: () => Promise<Post | null>;
  findById: ({ _id }: { _id: string }) => Promise<Post | null>;
  insert: (payload: Partial<IPost>) => Promise<Post | null>;
  delete: ({
    _id,
    last_deleted_by,
  }: {
    _id: string;
    last_deleted_by: string;
  }) => Promise<Post | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Post | null>;
  update: (updatePayload: Partial<IPost>) => Promise<Post | null>;
}

export interface PaginatedPostResult {
  data: Post[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

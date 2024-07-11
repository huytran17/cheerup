import IPostBookmark from "../../database/interfaces/post-bookmark";
export default interface IPostBookmarkDb {
  findAll: () => Promise<IPostBookmark[]>;
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
  }) => Promise<IPaginatedPostBookmarksResult>;
  findOne: () => Promise<IPostBookmark>;
  findById: ({ _id }: { _id: string }) => Promise<IPostBookmark>;
  countPostBookmarks: ({ user_id }: { user_id: string }) => Promise<number>;
  findByUserAndPost: ({
    user_id,
    post_id,
  }: {
    user_id: string;
    post_id: string;
  }) => Promise<IPostBookmark>;
  insert: (payload: Partial<IPostBookmark>) => Promise<IPostBookmark>;
  delete: ({ _id }: { _id: string }) => Promise<IPostBookmark>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IPostBookmark>;
  update: (payload: Partial<IPostBookmark>) => Promise<IPostBookmark>;
}

export interface IPaginatedPostBookmarksResult {
  data: IPostBookmark[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

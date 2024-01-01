import IPost from "../../database/interfaces/post";
export default interface IPostDb {
  findAllForSEO: () => Promise<IPost[]>;
  findAll: () => Promise<IPost[]>;
  findAllPaginated: (
    {
      categories,
      is_only_published,
      tags,
      sorts,
    }: {
      categories?: string[];
      is_only_published?: boolean;
      tags?: string[];
      sorts?: string;
    },
    {
      query,
      page,
      entries_per_page,
    }: {
      query: string;
      page: number;
      entries_per_page?: number;
    }
  ) => Promise<IPaginatedPostResult>;
  findOne: () => Promise<IPost>;
  countByCategory: ({
    category_id,
  }: {
    category_id: string;
  }) => Promise<number>;
  findSuggestionPosts: ({
    amount,
    categories,
    exclude_ids,
  }: {
    amount: number;
    categories: string[];
    exclude_ids?: string[];
  }) => Promise<IPost[]>;
  findById: ({
    _id,
    is_only_published,
    is_include_deleted,
  }: {
    _id: string;
    is_only_published?: boolean;
    is_include_deleted?: boolean;
  }) => Promise<IPost>;
  findBySlug: ({ slug }: { slug: string }) => Promise<IPost>;
  insert: (payload: Partial<IPost>) => Promise<IPost>;
  delete: ({ _id }: { _id: string }) => Promise<IPost>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IPost>;
  update: (updatePayload: Partial<IPost>) => Promise<IPost>;
  getPostAnalystics: ({
    range,
    unit,
  }: {
    range?: string[];
    unit?: string;
  }) => Promise<IPostAnalytics>;
  getMostPopularPostsAnalystics: ({
    range,
    unit,
    limit,
  }: {
    range?: string[];
    unit?: string;
    limit?: number;
  }) => Promise<IMostPopularPostsAnalytics>;
}

export interface IPaginatedPostResult {
  data: IPost[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

export interface IPostAnalytics {
  total_created_counts: number[];
  total_deleted_counts: number[];
  total_blocked_comment_counts: number[];
  total_count: number;
  total_published_counts: number[];
  formatted_dates: string[];
}

export interface IMostPopularPostsAnalytics {
  posts: IPost[];
  category_ratio: Record<string, unknown>;
}

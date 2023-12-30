import Post from "../../database/entities/post";
import IPost from "../../database/interfaces/post";
export default interface IPostDb {
  findAllForSEO: () => Promise<Post[]>;
  findAll: () => Promise<Post[]>;
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
  findOne: () => Promise<Post>;
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
  }) => Promise<Post[]>;
  findById: ({
    _id,
    is_only_published,
    is_include_deleted,
  }: {
    _id: string;
    is_only_published?: boolean;
    is_include_deleted?: boolean;
  }) => Promise<Post>;
  findBySlug: ({ slug }: { slug: string }) => Promise<Post>;
  insert: (payload: Partial<IPost>) => Promise<Post>;
  delete: ({ _id }: { _id: string }) => Promise<Post>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Post>;
  update: (updatePayload: Partial<IPost>) => Promise<Post>;
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

export interface IPostAnalytics {
  total_created_counts: number[];
  total_deleted_counts: number[];
  total_blocked_comment_counts: number[];
  total_count: number;
  total_published_counts: number[];
  formatted_dates: string[];
}

export interface IMostPopularPostsAnalytics {
  posts: Post[];
  category_ratio: Record<string, unknown>;
}

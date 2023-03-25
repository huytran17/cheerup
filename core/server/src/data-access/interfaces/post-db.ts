import Post from "../../database/entities/post";
import IPost from "../../database/interfaces/post";
export default interface IPostDb {
  findAll: () => Promise<Post[] | null>;
  findHighlight: () => Promise<Post | null>;
  findAllPaginated: (
    {
      categories,
      is_only_published,
      tags,
    }: {
      categories?: string[];
      is_only_published?: boolean;
      tags?: string[];
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
  ) => Promise<IPaginatedPostResult | null>;
  findOne: () => Promise<Post | null>;
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
  }) => Promise<Post | null>;
  insert: (payload: Partial<IPost>) => Promise<Post | null>;
  delete: ({ _id }: { _id: string }) => Promise<Post | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Post | null>;
  update: (updatePayload: Partial<IPost>) => Promise<Post | null>;
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
  }) => Promise<IMostPopularPostsAnalytics | null>;
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

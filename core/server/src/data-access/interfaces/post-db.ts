import Post from "../../database/entities/post";
import IPost from "../../database/interfaces/post";
export default interface IPostDb {
  findAll: () => Promise<Post[] | null>;
  findHighlight: () => Promise<Post | null>;
  findAllPaginated: (
    {
      categories,
    }: {
      categories?: string[];
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
  ) => Promise<PaginatedPostResult | null>;
  findOne: () => Promise<Post | null>;
  findSuggestionPosts: ({
    amount,
    categories,
  }: {
    amount: number;
    categories: string[];
  }) => Promise<Post[]>;
  findById: ({ _id }: { _id: string }) => Promise<Post | null>;
  insert: (payload: Partial<IPost>) => Promise<Post | null>;
  delete: ({ _id }: { _id: string }) => Promise<Post | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Post | null>;
  update: (updatePayload: Partial<IPost>) => Promise<Post | null>;
  getPostAnalystics: ({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }) => Promise<IPostAnalyticsData>;
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

export interface IPostAnalyticsData {
  total_created_counts: number[];
  total_deleted_counts: number[];
  total_blocked_comment_counts: number[];
  total_count: number;
  total_published_counts: number[];
  formatted_dates: string[];
}

import IPost from "../../database/interfaces/post";
export default interface IPostDb {
  findAllForSEO: () => Promise<IPost[]>;
  findAll: () => Promise<IPost[]>;
  findAllPaginated: (
    {
      categories,
      tags,
      sorts,
    }: {
      categories?: string[];
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
  ) => Promise<IPaginatedPostsResult>;
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
  findById: ({ _id }: { _id: string }) => Promise<IPost>;
  increaseViews: ({ _id }: { _id: string }) => Promise<IPost>;
  findSoftDeletedById: ({ _id }: { _id: string }) => Promise<IPost>;
  findBySlug: ({ slug }: { slug: string }) => Promise<IPost>;
  insert: (payload: Partial<IPost>) => Promise<IPost>;
  delete: ({ _id }: { _id: string }) => Promise<IPost>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IPost>;
  update: (payload: Partial<IPost>) => Promise<IPost>;
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

export interface IPaginatedPostsResult {
  data: IPost[];
  pagination: IPagination;
}

export interface IPostAnalytics {
  total_created_counts: number[];
  total_deleted_counts: number[];
  total_blocked_comment_counts: number[];
  total_count: number;
  formatted_dates: string[];
}

export interface IMostPopularPostsAnalytics {
  posts: IPost[];
  post_views: number[];
  post_titles: string[];
}

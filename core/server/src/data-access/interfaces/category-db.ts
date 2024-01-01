import ICategory from "../../database/interfaces/category";
export default interface ICategoryDb {
  findAllForSEO: () => Promise<ICategory[]>;
  findAll: () => Promise<ICategory[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedCategoryResult>;
  findOne: () => Promise<ICategory>;
  findAllCategoryTitles: () => Promise<
    { _id: string; title: string; slug: string }[]
  >;
  findById: ({
    _id,
    is_include_deleted,
  }: {
    _id: string;
    is_include_deleted?: boolean;
  }) => Promise<ICategory>;
  findByTitle: ({
    title,
    is_include_deleted,
  }: {
    title: string;
    is_include_deleted?: boolean;
  }) => Promise<ICategory>;
  findBySlug: ({ slug }: { slug: string }) => Promise<ICategory>;
  insert: (payload: Partial<ICategory>) => Promise<ICategory>;
  delete: ({ _id }: { _id: string }) => Promise<ICategory>;
  hardDelete: ({ _id }: { _id: string }) => Promise<ICategory>;
  update: (updatePayload: Partial<ICategory>) => Promise<ICategory>;
  getCategoryAnalystics: ({
    range,
    unit,
    limit,
  }: {
    range?: string[];
    unit?: string;
    limit?: number;
  }) => Promise<ICategoryAnalyticsData>;
}

export interface IPaginatedCategoryResult {
  data: ICategory[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

export interface ICategoryAnalyticsData {
  created_categories: ICategory[];
  most_popular_categories: ICategory[];
  total_count: number;
  formatted_dates: string[];
  created_category_titles: string[];
  created_category_colors: string[];
  related_post_counts: number[];
}

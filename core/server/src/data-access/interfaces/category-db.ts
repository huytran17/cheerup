import Category from "../../database/entities/category";
import ICategory from "../../database/interfaces/category";
export default interface ICategoryDb {
  findAllForSEO: () => Promise<Category[]>;
  findAll: () => Promise<Category[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedCategoryResult>;
  findOne: () => Promise<Category>;
  findAllCategoryTitles: () => Promise<
    { _id: string; title: string; slug: string }[]
  >;
  findById: ({
    _id,
    is_include_deleted,
  }: {
    _id: string;
    is_include_deleted?: boolean;
  }) => Promise<Category>;
  findByTitle: ({
    title,
    is_include_deleted,
  }: {
    title: string;
    is_include_deleted?: boolean;
  }) => Promise<Category>;
  findBySlug: ({ slug }: { slug: string }) => Promise<Category>;
  insert: (payload: Partial<ICategory>) => Promise<Category>;
  delete: ({ _id }: { _id: string }) => Promise<Category>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Category>;
  update: (updatePayload: Partial<ICategory>) => Promise<Category>;
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
  data: Category[];
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
  created_categories: Category[];
  most_popular_categories: Category[];
  total_count: number;
  formatted_dates: string[];
  created_category_titles: string[];
  created_category_colors: string[];
  related_post_counts: number[];
}

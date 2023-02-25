import Category from "../../database/entities/category";
import ICategory from "../../database/interfaces/category";
export default interface ICategoryDb {
  findAll: () => Promise<Category[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedCategoryResult | null>;
  findOne: () => Promise<Category | null>;
  findAllCategoryTitles: () => Promise<{ _id: string; title: string }[]>;
  findById: ({
    _id,
    is_include_deleted,
  }: {
    _id: string;
    is_include_deleted?: boolean;
  }) => Promise<Category | null>;
  findByTitle: ({
    title,
    is_include_deleted,
  }: {
    title: string;
    is_include_deleted?: boolean;
  }) => Promise<Category | null>;
  insert: (payload: Partial<ICategory>) => Promise<Category | null>;
  delete: ({ _id }: { _id: string }) => Promise<Category | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Category | null>;
  update: (updatePayload: Partial<ICategory>) => Promise<Category | null>;
  getCategoryAnalystics: ({
    range,
    unit,
  }: {
    range?: string[];
    unit?: string;
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
  // total_post_created_counts: number[];
  // total_created_counts: number[];
  // total_deleted_counts: number[];
  // total_owner_counts: number[];
  // total_collaborator_counts: number[];
  sorted_results: any[];
  total_count: number;
  formatted_dates: string[];
}

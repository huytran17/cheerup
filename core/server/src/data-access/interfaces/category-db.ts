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
  }) => Promise<PaginatedCategoryResult | null>;
  findOne: () => Promise<Category | null>;
  findById: ({ _id }: { _id: string }) => Promise<Category | null>;
  insert: (payload: Partial<ICategory>) => Promise<Category | null>;
  delete: ({ _id }: { _id: string }) => Promise<Category | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Category | null>;
  update: (updatePayload: Partial<ICategory>) => Promise<Category | null>;
}

export interface PaginatedCategoryResult {
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

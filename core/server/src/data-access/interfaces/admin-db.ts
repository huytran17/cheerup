import IAdmin, { AdminType } from "../../database/interfaces/admin";
export default interface IAdminDb {
  findAll: () => Promise<IAdmin[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedAdminsResult>;
  findOne: () => Promise<IAdmin>;
  findById: ({ _id }: { _id: string }) => Promise<IAdmin>;
  findSoftDeletedById: ({ _id }: { _id: string }) => Promise<IAdmin>;
  findByEmail: ({ email }: { email: string }) => Promise<IAdmin>;
  insert: (payload: Partial<IAdmin>) => Promise<IAdmin>;
  insertMany: (payload: Partial<IAdmin>[]) => Promise<IAdmin[]>;
  delete: ({ _id }: { _id: string }) => Promise<IAdmin>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IAdmin>;
  update: (payload: Partial<IAdmin>) => Promise<IAdmin>;
  getAdminAnalystics: ({
    author_type,
    range,
    unit,
  }: {
    author_type?: AdminType;
    range?: string[];
    unit?: string;
  }) => Promise<IAdminAnalyticsData>;
  increaseLoginFailedTimes: ({ _id }: { _id: string }) => Promise<IAdmin>;
  resetLoginFailedTimes: ({ _id }: { _id: string }) => Promise<IAdmin>;
}

export interface IPaginatedAdminsResult {
  data: IAdmin[];
  pagination: {
    current_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_more: boolean;
  };
}

export interface IAdminAnalyticsData {
  total_post_created_counts: number[];
  total_author_counts: number[];
  total_deleted_counts: number[];
  total_count: number;
  formatted_dates: string[];
}

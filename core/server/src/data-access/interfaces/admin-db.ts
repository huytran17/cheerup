import Admin from "../../database/entities/admin";
import IAdmin from "../../database/interfaces/admin";
export default interface IAdminDb {
  findAll: () => Promise<Admin[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedAdminResult | null>;
  findOne: () => Promise<Admin | null>;
  findById: ({ _id }: { _id: string }) => Promise<Admin | null>;
  findByEmail: ({ email }: { email: string }) => Promise<Admin | null>;
  insert: (payload: Partial<IAdmin>) => Promise<Admin | null>;
  delete: ({ _id }: { _id: string }) => Promise<Admin | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Admin | null>;
  update: (updatePayload: Partial<IAdmin>) => Promise<Admin | null>;
  getAdminAnalystics: ({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }) => Promise<IAdminAnalyticsData>;
}

export interface PaginatedAdminResult {
  data: Admin[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

export interface IAdminAnalyticsData {
  total_created_counts: number[];
  total_deleted_counts: number[];
  total_super_admin_counts: number[];
  total_normal_admin_counts: number[];
  total_verified_email_counts: number[];
  total_count: number;
  formatted_dates: string[];
}

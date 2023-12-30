import Admin from "../../database/entities/admin";
import IAdmin, { AdminType } from "../../database/interfaces/admin";
export default interface IAdminDb {
  findAll: () => Promise<Admin[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedAdminResult>;
  findOne: () => Promise<Admin>;
  findById: ({ _id }: { _id: string }) => Promise<Admin>;
  findByEmail: ({ email }: { email: string }) => Promise<Admin>;
  insert: (payload: Partial<IAdmin>) => Promise<Admin>;
  delete: ({ _id }: { _id: string }) => Promise<Admin>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Admin>;
  update: (updatePayload: Partial<IAdmin>) => Promise<Admin>;
  getAdminAnalystics: ({
    author_type,
    range,
    unit,
  }: {
    author_type?: AdminType;
    range?: string[];
    unit?: string;
  }) => Promise<IAdminAnalyticsData>;
}

export interface IPaginatedAdminResult {
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
  total_post_created_counts: number[];
  total_created_counts: number[];
  total_deleted_counts: number[];
  total_owner_counts: number[];
  total_collaborator_counts: number[];
  total_editor_counts: number[];
  total_count: number;
  formatted_dates: string[];
}

import User from "../../database/entities/user";
import IUser from "../../database/interfaces/user";
export default interface IUserDb {
  findAll: () => Promise<User[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedUserResult | null>;
  findOne: () => Promise<User | null>;
  findById: ({ _id }: { _id: string }) => Promise<User | null>;
  findByEmail: ({ email }: { email: string }) => Promise<User | null>;
  insert: (payload: Partial<IUser>) => Promise<User | null>;
  delete: ({ _id }: { _id: string }) => Promise<User | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<User | null>;
  update: (updatePayload: Partial<IUser>) => Promise<User | null>;
  getUserAnalystics: ({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }) => Promise<IUserAnalyticsData>;
}

export interface PaginatedUserResult {
  data: User[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

export interface IUserAnalyticsData {
  total_created_counts: number[];
  total_deleted_counts: number[];
  total_blocked_comment_counts: number[];
  total_verified_email_counts: number[];
  total_count: number;
  formatted_dates: string[];
}

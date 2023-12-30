import User from "../../database/entities/user";
import IUser from "../../database/interfaces/user";
export default interface IUserDb {
  findAll: () => Promise<User[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedUserResult>;
  findOne: () => Promise<User>;
  findById: ({
    _id,
    is_include_deleted,
  }: {
    _id: string;
    is_include_deleted?: boolean;
  }) => Promise<User>;
  findByEmail: ({
    email,
    is_include_deleted,
  }: {
    email: string;
    is_include_deleted?: boolean;
  }) => Promise<User>;
  insert: (payload: Partial<IUser>) => Promise<User>;
  delete: ({ _id }: { _id: string }) => Promise<User>;
  restore: ({ _id }: { _id: string }) => Promise<User>;
  hardDelete: ({ _id }: { _id: string }) => Promise<User>;
  update: (updatePayload: Partial<IUser>) => Promise<User>;
  getUserAnalystics: ({
    range,
    unit,
  }: {
    range?: string[];
    unit?: string;
  }) => Promise<IUserAnalyticsData>;
}

export interface IPaginatedUserResult {
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
  total_count: number;
  formatted_dates: string[];
  growth: {
    total_percentage: number;
    is_increased: boolean;
  };
}

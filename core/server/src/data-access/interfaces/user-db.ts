import IUser from "../../database/interfaces/user";
export default interface IUserDb {
  findAll: () => Promise<IUser[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedUserResult>;
  findOne: () => Promise<IUser>;
  findById: ({ _id }: { _id: string }) => Promise<IUser>;
  findByEmail: ({ email }: { email: string }) => Promise<IUser>;
  insert: (payload: Partial<IUser>) => Promise<IUser>;
  delete: ({ _id }: { _id: string }) => Promise<IUser>;
  restore: ({ _id }: { _id: string }) => Promise<IUser>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IUser>;
  update: (updatePayload: Partial<IUser>) => Promise<IUser>;
  getUserAnalystics: ({
    range,
    unit,
  }: {
    range?: string[];
    unit?: string;
  }) => Promise<IUserAnalyticsData>;
}

export interface IPaginatedUserResult {
  data: IUser[];
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

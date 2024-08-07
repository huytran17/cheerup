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
  }) => Promise<IPaginatedUsersResult>;
  findOne: () => Promise<IUser>;
  findById: ({ _id }: { _id: string }) => Promise<IUser>;
  findSoftDeletedById: ({ _id }: { _id: string }) => Promise<IUser>;
  findByEmail: ({ email }: { email: string }) => Promise<IUser>;
  insert: (payload: Partial<IUser>) => Promise<IUser>;
  insertMany: (payload: Partial<IUser>[]) => Promise<IUser[]>;
  delete: ({ _id }: { _id: string }) => Promise<IUser>;
  restore: ({ _id }: { _id: string }) => Promise<IUser>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IUser>;
  update: (payload: Partial<IUser>) => Promise<IUser>;
  getUserAnalystics: ({
    range,
    unit,
  }: {
    range?: string[];
    unit?: string;
  }) => Promise<IUserAnalyticsData>;
  findTfaSecretByEmail: ({ email }: { email: string }) => Promise<IUser>;
  increaseLoginFailedTimes: ({ _id }: { _id: string }) => Promise<IUser>;
  resetLoginFailedTimes: ({ _id }: { _id: string }) => Promise<IUser>;
}

export interface IPaginatedUsersResult {
  data: IUser[];
  pagination: IPagination;
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

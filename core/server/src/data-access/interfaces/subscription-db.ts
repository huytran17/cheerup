import ISubscription from "../../database/interfaces/subscription";
export default interface ISubscriptionDb {
  findAll: () => Promise<ISubscription[]>;
  findAllActivating: () => Promise<ISubscription[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedSubscriptionResult>;
  findOne: () => Promise<ISubscription>;
  findByEmail: ({ email }: { email: string }) => Promise<ISubscription>;
  findById: ({ _id }: { _id: string }) => Promise<ISubscription>;
  insert: (payload: Partial<ISubscription>) => Promise<ISubscription>;
  delete: ({ _id }: { _id: string }) => Promise<ISubscription>;
  hardDelete: ({ _id }: { _id: string }) => Promise<ISubscription>;
  update: (updatePayload: Partial<ISubscription>) => Promise<ISubscription>;
  getSubscriptionAnalystics: ({
    range,
    unit,
  }: {
    range?: string[];
    unit?: string;
  }) => Promise<ISubscriptionAnalyticsData>;
}

export interface IPaginatedSubscriptionResult {
  data: ISubscription[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

export interface ISubscriptionAnalyticsData {
  total_created_counts: number[];
  total_count: number;
  total_active_counts: number[];
  formatted_dates: string[];
}

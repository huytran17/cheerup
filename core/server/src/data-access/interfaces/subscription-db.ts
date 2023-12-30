import Subscription from "../../database/entities/subscription";
import ISubscription from "../../database/interfaces/subscription";
export default interface ISubscriptionDb {
  findAll: () => Promise<Subscription[]>;
  findAllActivating: () => Promise<Subscription[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedSubscriptionResult>;
  findOne: () => Promise<Subscription>;
  findByEmail: ({ email }: { email: string }) => Promise<Subscription>;
  findById: ({ _id }: { _id: string }) => Promise<Subscription>;
  insert: (payload: Partial<ISubscription>) => Promise<Subscription>;
  delete: ({ _id }: { _id: string }) => Promise<Subscription>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Subscription>;
  update: (updatePayload: Partial<ISubscription>) => Promise<Subscription>;
  getSubscriptionAnalystics: ({
    range,
    unit,
  }: {
    range?: string[];
    unit?: string;
  }) => Promise<ISubscriptionAnalyticsData>;
}

export interface IPaginatedSubscriptionResult {
  data: Subscription[];
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

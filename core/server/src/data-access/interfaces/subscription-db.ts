import Subscription from "../../database/entities/subscription";
import ISubscription from "../../database/interfaces/subscription";
export default interface ISubscriptionDb {
  findAll: () => Promise<Subscription[] | null>;
  findAllActivating: () => Promise<Subscription[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedSubscriptionResult | null>;
  findOne: () => Promise<Subscription | null>;
  findByEmail: ({ email }: { email: string }) => Promise<Subscription | null>;
  findById: ({ _id }: { _id: string }) => Promise<Subscription | null>;
  insert: (payload: Partial<ISubscription>) => Promise<Subscription | null>;
  delete: ({ _id }: { _id: string }) => Promise<Subscription | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Subscription | null>;
  update: (
    updatePayload: Partial<ISubscription>
  ) => Promise<Subscription | null>;
  getSubscriptionAnalystics: ({
    range,
    unit,
  }: {
    range?: string[];
    unit?: string;
  }) => Promise<ISubscriptionAnalyticsData>;
}

export interface PaginatedSubscriptionResult {
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

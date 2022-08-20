import Feedback from "../../database/entities/feedback";
import IFeedback from "../../database/interfaces/feedback";
export default interface IFeedbackDb {
  findAll: () => Promise<Feedback[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedFeedbackResult | null>;
  findOne: () => Promise<Feedback | null>;
  findById: ({ _id }: { _id: string }) => Promise<Feedback | null>;
  insert: (payload: Partial<IFeedback>) => Promise<Feedback | null>;
  delete: ({ _id }: { _id: string }) => Promise<Feedback | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Feedback | null>;
  update: (updatePayload: Partial<IFeedback>) => Promise<Feedback | null>;
  getFeedbackAnalystics: ({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }) => Promise<IFeedbackAnalyticsData>;
}

export interface PaginatedFeedbackResult {
  data: Feedback[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

export interface IFeedbackAnalyticsData {
  total_created_counts: number[];
  total_count: number;
  total_deleted_counts: number[];
  formatted_dates: string[];
}

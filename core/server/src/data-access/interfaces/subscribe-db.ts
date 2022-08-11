import Subscribe from "../../database/entities/subscribe";
import ISubscribe from "../../database/interfaces/subscribe";
export default interface ISubscribeDb {
  findAll: () => Promise<Subscribe[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedSubscribeResult | null>;
  findOne: () => Promise<Subscribe | null>;
  findById: ({ _id }: { _id: string }) => Promise<Subscribe | null>;
  insert: (payload: Partial<ISubscribe>) => Promise<Subscribe | null>;
  delete: ({ _id }: { _id: string }) => Promise<Subscribe | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Subscribe | null>;
  update: (updatePayload: Partial<ISubscribe>) => Promise<Subscribe | null>;
}

export interface PaginatedSubscribeResult {
  data: Subscribe[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

export type ExpectSingleEntity<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T;
  };
};

export type ExpectPaginatedEntities<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T[];
    pagination: {
      current_page: number | null;
      from: number | null;
      to: number | null;
      per_page: number | null;
      total: number | null;
      total_pages: number | null;
    };
  };
};

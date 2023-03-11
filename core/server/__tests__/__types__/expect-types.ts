export type ExpectSingleResult<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T | null | undefined;
  };
};

export type ExpectMultipleResults<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T[] | null | undefined;
  };
};

export type ExpectPaginatedResult<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T[] | null | undefined;
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

export type ExpectPaginatedPartialResult<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: (T[] & Partial<T>) | null | undefined;
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

export type ExpectResult<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T;
  };
};

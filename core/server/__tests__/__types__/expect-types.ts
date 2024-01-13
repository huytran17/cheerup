export interface IPagination {
  current_page: number | null;
  from: number | null;
  to: number | null;
  per_page: number | null;
  total: number | null;
  total_pages: number | null;
}

export type ExpectSingleResult<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T | null | undefined | {};
  };
};

export type ExpectMultipleResults<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T[] | null | undefined | [];
  };
};

export type ExpectPaginatedResult<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T[] | null | undefined | [];
    pagination: IPagination;
  };
};

export type ExpectPaginatedPartialResult<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: (T[] & Partial<T>) | null | undefined | [];
    pagination: IPagination;
  };
};

export type ExpectSingedOutResult = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: {
      sign_out: boolean;
    };
  };
};

export type ExpectExportResult = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: {
      name: string;
      buffer: Buffer;
    };
  };
};

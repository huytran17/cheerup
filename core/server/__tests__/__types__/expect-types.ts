export type ExpectSingleEntity<T> = {
  headers: Record<string, unknown>;
  statusCode: number;
  body: {
    data: T;
  };
};

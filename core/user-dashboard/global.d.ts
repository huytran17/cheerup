export {};

declare global {
  interface IPagination {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    from: number;
    to: number;
    has_more: boolean;
  }
}

export {};

declare global {
  interface IFileMeta {
    filename: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    path: string;
    size: number;
  }

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

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
}

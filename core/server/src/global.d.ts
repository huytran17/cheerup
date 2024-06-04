export {};

declare global {
  interface IFileInfo {
    filename: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    path: string;
    size: number;
  }
}

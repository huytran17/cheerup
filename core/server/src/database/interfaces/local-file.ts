export default interface ILocalFile {
  _id: string;
  filename: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  path: string;
  size: number;
  created_at: Date;
}

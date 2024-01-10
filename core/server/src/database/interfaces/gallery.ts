import IAdmin from "./admin";

export default interface IGallery {
  _id: string;
  name: string;
  parent?: IGallery;
  items: Record<string, unknown>[];
  created_by: IAdmin;
  created_at: Date;
  updated_at: Date;
}

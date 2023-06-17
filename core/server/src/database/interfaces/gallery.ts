import Admin from "../entities/admin";

export default interface IGallery {
  _id: string;
  name: string;
  parent?: IGallery;
  items: Record<string, unknown>[];
  created_by: Admin;
  created_at: Date;
  updated_at: Date;
}

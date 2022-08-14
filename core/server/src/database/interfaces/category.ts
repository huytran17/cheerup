import Admin from "../entities/admin";

export default interface ICategory {
  _id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  thumbnail: Record<string, unknown>;
  created_by: Admin;
  last_deleted_by: Admin;
  last_restored_by: Admin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  last_restored_at: Date;
}

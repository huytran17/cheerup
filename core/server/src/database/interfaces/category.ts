import IAdmin from "./admin";

export default interface ICategory {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url?: string;
  badge_color?: string;
  thumbnail?: Record<string, unknown>;
  seo?: Record<string, unknown>;
  created_by: IAdmin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

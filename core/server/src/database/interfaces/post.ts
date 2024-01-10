import IAdmin from "./admin";
import ICategory from "./category";

export default interface IPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  source: string;
  thumbnail_url?: string;
  is_blocked_comment: boolean;
  is_notified_to_user: boolean;
  thumbnail?: Record<string, unknown>;
  content: string;
  tags: string[];
  author: IAdmin;
  categories: ICategory[];
  views: number;
  seo?: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
